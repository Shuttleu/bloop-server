const db = require("./models");

const { Op } = require("sequelize");

async function alphabetically(user) {
  const count = await db.Box.count();
  const boxes = await db.Box.findAll({ order: [["name", "DESC"]] });
  const bloops = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: count,
  });
  let alphabetical = true;
  bloops.forEach((bloop, index) => {
    if (bloop.BoxId != boxes[index].id) alphabetical = false;
  });
  return alphabetical;
}
async function avidReader(user) {
  return false;
}
async function hiddenTrail(user) {
  return false;
}
async function digitSum(user) {
  const lastBloop = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: 1,
    include: ["User"],
  });
  console.log("User");
  console.log(lastBloop[0].User);
  const previousBloop = await db.Bloop.findAll({
    where: { id: { [Op.lte]: lastBloop[0].id }, BoxId: lastBloop[0].BoxId },
    order: [["createdAt", "DESC"]],
    limit: 1,
    offset: 1,
    include: ["User"],
  });

  if (lastBloop[0].User.cardId == previousBloop[0].User.cardId) {
    return false;
  }

  let lastId = lastBloop[0].User.cardId;
  let lastSum = 0;
  let previousId = previousBloop[0].User.cardId;
  let previousSum = 0;

  while (lastId) {
    lastSum += lastId % 10;
    lastId = Math.floor(lastId / 10);
  }
  while (previousId) {
    previousSum += previousId % 10;
    previousId = Math.floor(previousId / 10);
  }
  return lastSum == previousSum;
}
async function eternalLove(user) {
  return false;
}
async function fibonacci(user) {
  return false;
}
async function finalCountdown(user) {
  return false;
}
async function numberBuddies(user) {
  return false;
}
async function prime(user) {
  return false;
}
async function sos(user) {
  return false;
}
async function milestone100(user) {
  return (await user.countBloops()) == 100;
}
async function milestone500(user) {
  return (await user.countBloops()) == 500;
}
async function milestone1000(user) {
  return (await user.countBloops()) == 1000;
}
async function milestone2000(user) {
  return (await user.countBloops()) == 2000;
}
async function milestone3000(user) {
  return (await user.countBloops()) == 3000;
}
async function milestone4000(user) {
  return (await user.countBloops()) == 4000;
}
async function milestone5000(user) {
  return (await user.countBloops()) == 5000;
}
async function firstBork(user) {
  const bloops = await user.countBloops();
  console.log(bloops);
  return bloops == 1;
}
async function maniac(user) {
  return false;
}
async function rapidFire(user) {
  return false;
}
async function relayRace(user) {
  return false;
}
async function earlyBird(user) {
  const lastBloop = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: 1,
  });

  return (
    lastBloop[0].createdAt.getHours() > 4 &&
    lastBloop[0].createdAt.getHours() < 7
  );
}
async function firstBloopOfTheHour(user) {
  const lastBloop = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: 1,
  });
  const previousBloop = await db.Bloop.findAll({
    where: { id: { [Op.lte]: lastBloop[0].id }, BoxId: lastBloop[0].BoxId },
    order: [["createdAt", "DESC"]],
    limit: 1,
    offset: 1,
  });

  return (
    lastBloop[0].createdAt.getHours() != previousBloop[0].createdAt.getHours()
  );
}
async function highNoon(user) {
  const lastBloop = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: 1,
  });

  return (
    lastBloop[0].createdAt.getHours() == 12 &&
    lastBloop[0].createdAt.getMinutes() == 0
  );
}
async function leet(user) {
  const lastBloop = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: 1,
  });

  return (
    lastBloop[0].createdAt.getHours() == 13 &&
    lastBloop[0].createdAt.getMinutes() == 37
  );
}
async function nightOwl(user) {
  const lastBloop = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: 1,
  });

  return (
    lastBloop[0].createdAt.getHours() > 23 ||
    lastBloop[0].createdAt.getHours() < 3
  );
}
async function e621(user) {
  const lastBloop = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: 1,
  });

  return (
    (lastBloop[0].createdAt.getHours() == 6 ||
      lastBloop[0].createdAt.getHours() == 18) &&
    lastBloop[0].createdAt.getMinutes() == 21
  );
}
async function witchingHour(user) {
  const lastBloop = await user.getBloops({
    order: [["createdAt", "DESC"]],
    limit: 1,
  });

  return lastBloop[0].createdAt.getHours() == 0;
}
async function bugHunter(user) {
  return false;
}

const checkAchievements = [
  firstBork,
  milestone100,
  milestone500,
  milestone1000,
  milestone2000,
  milestone3000,
  milestone4000,
  milestone5000,
  alphabetically,
  digitSum,
  earlyBird,
  firstBloopOfTheHour,
  highNoon,
  leet,
  nightOwl,
  e621,
  witchingHour,
];

module.exports = checkAchievements;
