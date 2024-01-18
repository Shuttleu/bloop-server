const {startServer} = require('bloop-server');
const {readFileSync} = require('fs');

const uuidBuffer = require('uuid-buffer');
const {
  AudioFoundResult,
  AudioNotFoundResult,
  ThrottledUidResult,
  ValidUidResult,
  UnknownUidResult
} = require('bloop-server');

const db = require("./models");

const axios = require('axios');

//db.sequelize.sync();

const checkAchievements = require("./achievements.js");

class MyProcessor {
  authenticate(clientId, secret) {
    return secret === 'bar';
  }

  async checkUid(clientId, uid) {
    const hexUid = uid.toString('hex');
    let user = await db.User.findOne({ where: { uid: hexUid } });
    //user = await db.User.create({uid: hexUid, username: "Shuttleu", cardId: 1});
    console.log(user);
    if (user === null){
        
      try{
        const newUser = await axios.post(
          "https://graze-api.scotiacon.org.uk/export/api/0.1/badge-lookup", 
          {
            access_key: "", 
            serial_number: ""
          }
        )
        user = await db.User.create({uid: hexUid, username: "", cardId: 0});
      } catch (error) {
        console.log(error);
        return new UnknownUidResult();
      }
    }
    const [box, created] = await db.Box.findOrCreate({ where: { name: clientId } });

    console.log(user);
    
    const lastScan = await db.Bloop.max("updatedAt", { where: { UserId: user.id } });

    if (Date.now() - lastScan < 5000) {    
      return new ThrottledUidResult();
    }

    const achievements = [];
    
    console.log("cwe");

    console.log(user);
    console.log(box);
    await user.createBloop({ BoxId: box.id });
    console.log("dwe");
    checkAchievements.forEach((checkAchievement) => {
      achievements.push(checkAchievement(user));
    })

    return Promise.allSettled(achievements).then(async (results) => {

      console.log("new_achievements");
      console.log(results);
      const new_achievements = [];
      for (const [index, achievement] of results.entries()) {
        const gained = await user.hasAchievement(index + 1);
        console.log(gained);
        if (!gained && achievement.value) {
          await user.addAchievement(index + 1);
          const new_achievement = await db.Achievement.findByPk(index + 1);
          new_achievements.push(new_achievement);
        }
      };

      console.log("new_achievements");
      console.log(new_achievements);

      const achievements_fulfilled = [];

      return Promise.allSettled(new_achievements).then((results) => {
        results.forEach((result) => {
          achievements_fulfilled.push(uuidBuffer.toBuffer(result.value.uuid))
        });
        return new ValidUidResult(achievements_fulfilled); 
      });
    });
  }

  async getAudio(id) {
    const hexId = id.toString('hex');

    if (hexId === '0000000000000000000000000000000000000001') {
      // Return MP3 audio data.
      return new AudioFoundResult(Buffer.alloc(50));
    }

    return new AudioNotFoundResult();
  }
}

const processor = new MyProcessor();
const {server, closeOpenConnections} = startServer({
  processor,

  tls: {
    key: readFileSync(`test.key`),
    cert: readFileSync(`test.crt`),
  },
  port: 12345,
});


// This takes care of gracefully shutting down the server on CTRL+C
process.on('SIGINT', () => {
  closeOpenConnections();
  server.close(() => {
    process.exit(0);
  });
});