const { startServer } = require("bloop-server");
const { readFileSync } = require("fs");

const uuidBuffer = require("uuid-buffer");
const {
  AudioFoundResult,
  AudioNotFoundResult,
  ThrottledUidResult,
  ValidUidResult,
  UnknownUidResult,
} = require("bloop-server");

const db = require("./models");

const axios = require("axios");

const { Op } = require("sequelize");

const checkAchievements = require("./achievements.js");

class MyProcessor {
  authenticate(clientId, secret) {
    return secret === process.env.CLIENT_SECRET;
  }

  async checkUid(clientId, uid) {
    const hexUid = uid.toString("hex");
    let user = await db.User.findOne({ where: { uid: hexUid } });
    //user = await db.User.create({uid: hexUid, username: "Shuttleu", cardId: 1});
    if (user === null) {
      try {
        if (hexUid == "0470159a931190" || hexUid == "045b4365100289") {
          user = await db.User.create({
            uid: hexUid,
            username: "Snowcone",
            cardId: 0,
          });
        } else {
          const newUser = await axios.post(
            process.env.BADGE_API_URL,
            {
              access_key: process.env.BADGE_API_KEY,
              serial_number: hexUid.match(/.{2}/g).join(":"),
            },
          );
          user = await db.User.create({
            uid: hexUid,
            username: newUser.data.display_name,
            cardId: parseInt(newUser.data.badge_id),
          });
        }
      } catch (error) {
        console.log(`Unknown uid: ${hexUid}`);
        return new UnknownUidResult();
      }
    }
    const [box, created] = await db.Box.findOrCreate({
      where: { name: clientId },
    });

    const lastScan = await db.Bloop.max("createdAt", {
      where: { UserId: user.id },
    });

    if (Date.now() - lastScan < 1500) {
      console.log(`Scanned too quickly: ${hexUid}`);
      return new ThrottledUidResult();
    }

    const lastBloops = await db.Bloop.findAll({
      where: { BoxId: box.id },
      order: [["createdAt", "DESC"]],
      limit: 5,
      include: ["User"],
    });

    let throttle = true;

    if (lastBloops.length == 5) {
      for (let i = 0; i < 5; i++) {
        if (lastBloops[i].User.id != user.id) {
          throttle = false;
        }
      }
    } else {
      throttle = false;
    }

    if (throttle) {
      console.log(`Scanned too many times: ${hexUid}`);
      return new ThrottledUidResult();
    }


    const achievements = [];
    await user.createBloop({ BoxId: box.id });

    if (hexUid == "04a9da6b100289" || hexUid == "045b4365100289") {
      return new ValidUidResult([]);
    }

    const boxCount = db.Box.count();
    const allBoxes = db.Box.findAll({ order: [["name", "DESC"]] });
    const userBloopCount = user.countBloops();
    const userBloops = await user.getBloops({
      order: [["createdAt", "DESC"]],
      limit: 100,
    });
    const previousBloops = db.Bloop.findAll({
      where: { id: { [Op.lte]: userBloops[0].id }, BoxId: userBloops[0].BoxId },
      order: [["createdAt", "DESC"]],
      limit: 100,
      offset: 1,
      include: ["User"],
    });

    return Promise.allSettled([
      boxCount,
      allBoxes,
      userBloopCount,
      userBloops,
      previousBloops,
    ]).then(async (results) => {
      checkAchievements.forEach((checkAchievement) => {
        achievements.push(
          checkAchievement(
            user,
            results[0].value,
            results[1].value,
            results[2].value,
            results[3].value,
            results[4].value,
          ),
        );
      });

      return Promise.allSettled(achievements).then(async (results) => {
        //console.log("new_achievements");
        //console.log(results);
        const newAchievements = [];
        const currentAchievements = await user.getAchievements();
        for (const [index, achievement] of results.entries()) {
          let gained = false;
          currentAchievements.forEach((existingAchievement) => {
            if (existingAchievement.id == index + 1) gained = true;
          });
          //console.log(gained);
          if (!gained && achievement.value) {
            await user.addAchievement(index + 1);
            const new_achievement = await db.Achievement.findByPk(index + 1);
            newAchievements.push(new_achievement);
          }
        }

        const achievementsFulfilled = [];

        return Promise.allSettled(newAchievements).then((results) => {
          results.forEach((result) => {
            achievementsFulfilled.push(uuidBuffer.toBuffer(result.value.uuid));
          });
          console.log(`Completed bark for: ${hexUid}`);
          return new ValidUidResult(achievementsFulfilled);
        });
      });
    });
  }

  async getAudio(id) {
    const hexId = id.toString("hex");

    try {
      // Return MP3 audio data.
      return new AudioFoundResult(readFileSync(`achievements/${hexId}.mp3`));
    } catch { }

    return new AudioNotFoundResult();
  }
}

const processor = new MyProcessor();
const { server, closeOpenConnections } = startServer({
  processor,

  tls: {
    key: readFileSync(`test.key`),
    cert: readFileSync(`test.crt`),
  },
  port: 12346,
});

// This takes care of gracefully shutting down the server on CTRL+C
process.on("SIGINT", () => {
  closeOpenConnections();
  server.close(() => {
    process.exit(0);
  });
});
