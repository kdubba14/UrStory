const Sequelize = require("sequelize");
const keys = require("../config/keys");

module.exports = new Sequelize(
  `postgres://${keys.pgUser}:${keys.pgPass}@isilo.db.elephantsql.com:5432/${
    keys.pgUser
  }`
);
