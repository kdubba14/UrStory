const Sequelize = require("sequelize");
const pgdb = require("../config/db");

const Person = pgdb.define("person", {
  protagId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  faveColor: {
    type: Sequelize.STRING
  },
  homeCountry: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  career: {
    type: Sequelize.STRING
  }
});

// pgdb.sync();

module.exports = Person;
