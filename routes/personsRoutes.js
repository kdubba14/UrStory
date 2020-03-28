const express = require("express");
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const pgdb = require("../config/db");
const Person = require("../models/Person");
const User = require("../models/User");
const Journal = require("../models/Journal");
const Entry = require("../models/Entry");

router.get("/", cors(), (req, res) => {
  Person.findAll()
    .then(persons => res.send(persons))
    .catch(err => res.send(err));
});

router.get("/test", cors(), async (req, res) => {
  let testData = [{ message: "hi" }];

  try {
    let phase1 = await axios.get(
      "https://stats.nba.com/stats/commonTeamYears/?LeagueID=00"
    );

    testData = { message: "bye" };
  } catch (err) {
    testData = { error: err };
  }

  res.send(testData);
});

router.get("/add", (req, res) => {
  let data = {
    journalId: "ab59daf9-7936-41c8-8ca7-8c1c270b7ee2",
    authorId: "165a4d40-8d8e-11e9-a7c6-557e3fb5a057",
    title: "Bray J2 E1",
    content: "Yooo"
  };

  let { journalId, authorId, title, content } = data;

  Entry.create({
    journalId,
    authorId,
    title,
    content
  })
    .then(user => {
      res.redirect("/api/graphql");
    })
    .catch(err => res.send(err));
});

module.exports = router;
