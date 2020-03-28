const Sequelize = require("sequelize");
const pgdb = require("../config/db");

const Entry = require("./Entry");

const Journal = pgdb.define(
  "journal",
  {
    journalId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    authorId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cover: {
      type: Sequelize.STRING
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    }
  },
  {
    paranoid: true
  }
);

module.exports = Journal;
