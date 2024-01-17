'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Achievements', [{
      name: 'First Bork',
      desc: 'Welcome to Scotiacon',
      points: 5,
      uuid: 'acf2f12d-6f45-4bba-a536-d8fcb1a6bb5e',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Milestone: 100 boops',
      desc: 'You borked 100 times',
      points: 1,
      uuid: 'c33c5243-2e15-404d-b5a2-b9e5343d6984',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Milestone: 500 boops',
      desc: 'You borked 500 times',
      points: 1,
      uuid: 'c83f36e1-3b19-481f-a317-f48d9360de72',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Milestone: 1000 boops',
      desc: 'You borked 1000 times',
      points: 2,
      uuid: '463bf041-6a58-437b-b35e-d0b02bad5b43',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Milestone: 2000 boops',
      desc: 'You borked 2000 times',
      points: 1,
      uuid: 'ee42eb39-0fd3-4d4f-8a55-d0c32095fd87',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Milestone: 3000 boops',
      desc: 'You borked 3000 times',
      points: 0,
      uuid: 'f6736cd5-f423-4564-be77-e727f3946b4f',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Milestone: 4000 boops',
      desc: 'You borked 4000 times',
      points: 0,
      uuid: '0144256f-f948-44c0-8654-7a5d95cdd1ac',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Milestone: 5000 boops',
      desc: 'You borked 5000 times',
      points: 0,
      uuid: '08accadc-76c1-4e4c-9c02-a2cdbbf0e0dc',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Alphabetically',
      desc: 'Bork all boxes in alphabetical order.',
      points: 3,
      uuid: '3f19b87d-b88e-428d-85f6-f12b098f8f7c',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Digit Sum',
      desc: 'Find an attendee with the same sum of digits.',
      points: 2,
      uuid: 'eb5b788f-5fa5-41e4-8118-9a8af77e6024',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Early Bird',
      desc: 'Find an attendee with the same sum of digits.',
      points: 2,
      uuid: 'eb5b788f-5fa5-41e4-8118-9a8af77e6024',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'First Bloop of the Hour',
      desc: 'Find an attendee with the same sum of digits.',
      points: 2,
      uuid: 'eb5b788f-5fa5-41e4-8118-9a8af77e6024',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'High Noon',
      desc: 'Find an attendee with the same sum of digits.',
      points: 2,
      uuid: 'eb5b788f-5fa5-41e4-8118-9a8af77e6024',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '1337',
      desc: 'Find an attendee with the same sum of digits.',
      points: 2,
      uuid: 'eb5b788f-5fa5-41e4-8118-9a8af77e6024',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Night Owl',
      desc: 'Find an attendee with the same sum of digits.',
      points: 2,
      uuid: 'eb5b788f-5fa5-41e4-8118-9a8af77e6024',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '621',
      desc: 'Find an attendee with the same sum of digits.',
      points: 2,
      uuid: 'eb5b788f-5fa5-41e4-8118-9a8af77e6024',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Witching Hour',
      desc: 'Find an attendee with the same sum of digits.',
      points: 2,
      uuid: 'eb5b788f-5fa5-41e4-8118-9a8af77e6024',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  async down (queryInterface, Sequelize) {

     return queryInterface.bulkDelete('Achievements', null, {});
  }
};
