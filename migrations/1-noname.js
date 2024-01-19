"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "Achievements", deps: []
 * createTable "Boxes", deps: []
 * createTable "Users", deps: []
 * createTable "Bloops", deps: [Users, Boxes]
 * createTable "UserAchievements", deps: [Achievements, Users]
 *
 **/

var info = {
  revision: 1,
  name: "noname",
  created: "2024-01-18T15:29:01.479Z",
  comment: "",
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "createTable",
      params: [
        "Achievements",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            field: "name",
          },
          desc: {
            type: Sequelize.STRING,
            field: "desc",
          },
          points: {
            type: Sequelize.INTEGER,
            field: "points",
          },
          uuid: {
            type: Sequelize.UUID,
            field: "uuid",
          },
          hidden: {
            type: Sequelize.BOOLEAN,
            field: "hidden",
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false,
          },
        },
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "createTable",
      params: [
        "Boxes",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            field: "name",
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false,
          },
        },
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "createTable",
      params: [
        "Users",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          username: {
            type: Sequelize.STRING,
            field: "username",
          },
          uid: {
            type: Sequelize.STRING,
            field: "uid",
          },
          cardId: {
            type: Sequelize.INTEGER,
            field: "cardId",
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false,
          },
        },
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "createTable",
      params: [
        "Bloops",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false,
          },
          UserId: {
            type: Sequelize.INTEGER,
            field: "UserId",
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            references: {
              model: "Users",
              key: "id",
            },
            allowNull: true,
          },
          BoxId: {
            type: Sequelize.INTEGER,
            field: "BoxId",
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            references: {
              model: "Boxes",
              key: "id",
            },
            allowNull: true,
          },
        },
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "createTable",
      params: [
        "UserAchievements",
        {
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false,
          },
          AchievementId: {
            type: Sequelize.INTEGER,
            field: "AchievementId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            references: {
              model: "Achievements",
              key: "id",
            },
            primaryKey: true,
          },
          UserId: {
            type: Sequelize.INTEGER,
            field: "UserId",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            references: {
              model: "Users",
              key: "id",
            },
            primaryKey: true,
          },
        },
        {
          transaction: transaction,
        },
      ],
    },
  ];
};
var rollbackCommands = function (transaction) {
  return [
    {
      fn: "dropTable",
      params: [
        "Achievements",
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "dropTable",
      params: [
        "Bloops",
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "dropTable",
      params: [
        "Boxes",
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "dropTable",
      params: [
        "Users",
        {
          transaction: transaction,
        },
      ],
    },
    {
      fn: "dropTable",
      params: [
        "UserAchievements",
        {
          transaction: transaction,
        },
      ],
    },
  ];
};

module.exports = {
  pos: 0,
  useTransaction: true,
  execute: function (queryInterface, Sequelize, _commands) {
    var index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise(function (resolve, reject) {
        function next() {
          if (index < commands.length) {
            let command = commands[index];
            console.log("[#" + index + "] execute: " + command.fn);
            index++;
            queryInterface[command.fn]
              .apply(queryInterface, command.params)
              .then(next, reject);
          } else resolve();
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    } else {
      return run(null);
    }
  },
  up: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
  info: info,
};
