const Sequelize = require("sequelize");
const pgdb = require("../config/db");

const Entry = pgdb.define(
  "entry",
  {
    entryId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    journalId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    authorId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false //Make it auto not explicitly set
    },
    content: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    attachments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
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

// pgdb
//   .sync()
//   .then(resp => console.log("---------Entry Done: "))
//   .catch(err => console.log("--------Error: ", err));

module.exports = Entry;
