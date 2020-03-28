const Sequelize = require("sequelize");
const pgdb = require("../config/db");

const Person = require("./Person");
const Journal = require("./Journal");

const User = pgdb.define(
  "user",
  {
    userID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    importantDates: {
      type: Sequelize.ARRAY(Sequelize.DATEONLY),
      defaultValue: []
    },
    protags: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    }
  },
  {
    paranoid: true
  }
);

module.exports = User;
