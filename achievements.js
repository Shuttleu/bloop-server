const db = require("./models");

async function alphabetically(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const boxes = allBoxes;
  const bloops = userBloops;
  let alphabetical = boxCount <= userBloopCount;

  if (alphabetical) {
    boxes.forEach((box, index) => {
      if (box.id != bloops[index].BoxId) alphabetical = false;
    });
  }
  return alphabetical;
}

async function digitSum(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const previousBloop = previousBloops[0];

  if (user.id == previousBloop.User.id) {
    return false;
  }

  let lastId = user.cardId;
  let lastSum = 0;
  let previousId = previousBloop.User.cardId;
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

async function fibonacci(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  if (user.id == previousBloops[0].User.id)
    return false;
  const lastUser = previousBloops[0].User.cardId;
  function isPerfectSquare(x) {
    let s = parseInt(Math.sqrt(x));
    return s * s == x;
  }
  return (
    isPerfectSquare(5 * lastUser * lastUser + 4) ||
    isPerfectSquare(5 * lastUser * lastUser - 4)
  );
}

async function finalCountdown(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  console.log(user.cardId.toString()[0]);
  if (user.cardId.toString()[0] != "1")
    return false;

  for (let i = 7; i >= 0; i--) {
    console.log(`${i + 2} = ${previousBloops[i].User.cardId.toString()[0]}`)
    if (previousBloops[i].User.cardId.toString()[0] != (i + 2).toString())
      return false;
  }


  for (let i = 7; i >= 0; i--) {
    let achievementUser = await db.User.findByPk(previousBloops[i].User.id);
    await achievementUser.addAchievement(28);
  }
  return true;
}

async function numberBuddies(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const previousBloop = previousBloops[0];
  const diferentPerson = user.id != previousBloop.User.id;
  return (
    diferentPerson &&
    user.cardId.toString()[0] == previousBloops[0].User.cardId.toString()[0]
  );
}

async function prime(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  if (user.id == previousBloops[0].User.id)
    return false;
  const previousCard = previousBloops[0].User.cardId;
  for (let i = 2, s = Math.sqrt(previousCard); i <= s; i++) {
    if (previousCard % i === 0) return false;
  }
  return true;
}

async function sos(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  if (user.id != previousBloops[0].User.id || user.id != previousBloops[5].User.id)
    return false;

  const pattern = [true, false, true];

  for (let i = 0; i < 7; i++)
    if ((previousBloops[i].User.id == previousBloops[i + 1].User.id) != pattern[i % 3])
      return false;

  let achievementUser = await db.User.findByPk(previousBloops[3].User.id);
  await achievementUser.addAchievement(23);

  return true;
}

async function milestone100(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  return userBloopCount >= 100;
}

async function milestone500(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  return userBloopCount >= 500;
}

async function milestone1000(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  return userBloopCount >= 1000;
}

async function milestone2000(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  return userBloopCount >= 2000;
}

async function milestone3000(
  usboxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloopser,
) {
  return userBloopCount >= 3000;
}

async function milestone4000(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  return userBloopCount >= 4000;
}

async function milestone5000(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  return userBloopCount >= 5000;
}

async function firstBork(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  return userBloopCount >= 1;
}

async function maniac(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  if (userBloopCount < 100) return false;
  const usersOldBloop = userBloops[99];
  return Date.now() - usersOldBloop.createdAt < 600000;
}

async function rapidFire(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  if (userBloopCount < 30) return false;
  const usersOldBloop = userBloops[29];
  return Date.now() - usersOldBloop.createdAt < 120000;
}

async function relayRace(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];
  const secondLastBloop = userBloops[1];
  const thirdLastBloop = userBloops[2];
  if (
    lastBloop.BoxId != secondLastBloop.BoxId &&
    secondLastBloop.BoxId != thirdLastBloop.BoxId &&
    thirdLastBloop.BoxId != lastBloop.BoxId
  )
    return Date.now() - thirdLastBloop.createdAt < 60000;
  return false;
}

async function earlyBird(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];

  return (
    lastBloop.createdAt.getHours() > 4 && lastBloop.createdAt.getHours() < 7
  );
}

async function firstBloopOfTheHour(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];
  const previousBloop = previousBloops[0];

  return lastBloop.createdAt.getHours() != previousBloop.createdAt.getHours();
}

async function highTea(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];

  return (
    lastBloop.createdAt.getHours() == 16 &&
    lastBloop.createdAt.getMinutes() == 59 ||
    lastBloop.createdAt.getHours() == 17 &&
    lastBloop.createdAt.getMinutes() <= 3
  );
}

async function highNoon(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];

  return (
    lastBloop.createdAt.getHours() == 11 &&
    lastBloop.createdAt.getMinutes() == 59 ||
    lastBloop.createdAt.getHours() == 12 &&
    lastBloop.createdAt.getMinutes() <= 3
  );
}

async function truth(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];

  return (
    (lastBloop.createdAt.getHours() == 11 ||
      lastBloop.createdAt.getHours() == 23) &&
    lastBloop.createdAt.getMinutes() == 21
  );
}

async function leet(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];

  return (
    lastBloop.createdAt.getHours() == 13 &&
    lastBloop.createdAt.getMinutes() == 37
  );
}

async function nightOwl(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];

  return (
    lastBloop.createdAt.getHours() == 2
  );
}

async function e621(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];

  return (
    (lastBloop.createdAt.getHours() == 6 ||
      lastBloop.createdAt.getHours() == 18) &&
    lastBloop.createdAt.getMinutes() == 21
  );
}

async function witchingHour(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = userBloops[0];

  return lastBloop.createdAt.getHours() == 0;
}

async function peopleRikRoll(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 92)
      return true;
  }

  return false;
}

async function peopleJez(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 52)
      return true;
  }

  return false;
}

async function peopleSnowcone(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  const lastBloop = previousBloops[0];

  return (lastBloop.User.uid == "04a9da6b100289" || lastBloop.User.uid == "045b4365100289");
}

async function peopleSilver(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 27)
      return true;
  }

  return false;
}

async function peopleFaith(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 51)
      return true;
  }

  return false;
}

async function peopleTakk(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 86)
      return true;
  }

  return false;
}

async function peopleGoh(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 300000)
      break;
    if (previousBloops[i].User.cardId == 165)
      return true;
  }

  return false;
}

async function peopleEngineer(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 21)
      return true;
  }

  return false;
}

async function peopleFudgy(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 3)
      return true;
  }

  return false;
}

async function peopleAzakir(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 19)
      return true;
  }

  return false;
}

async function peopleKisumi(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 7)
      return true;
  }

  return false;
}

async function peopleChairman(
  user,
  boxCount,
  allBoxes,
  userBloopCount,
  userBloops,
  previousBloops,
) {
  for (let i = 0; i < previousBloops.length; i++) {
    if (Date.now() - previousBloops[i].createdAt > 120000)
      break;
    if (previousBloops[i].User.cardId == 24 || previousBloops[i].User.cardId == 163)
      return true;
  }

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
  numberBuddies,
  prime,
  maniac,
  rapidFire,
  relayRace,
  sos,
  fibonacci,
  finalCountdown,
  peopleRikRoll,
  peopleJez,
  peopleSnowcone,
  peopleSilver,
  peopleFaith,
  peopleTakk,
  peopleGoh,
  peopleEngineer,
  peopleFudgy,
  peopleAzakir,
  peopleKisumi,
  peopleChairman,
  truth,
  highTea,
];

module.exports = checkAchievements;
