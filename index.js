const express = require("express");
const axios = require("axios");
const Sequelize = require("sequelize");
const expressGraphQL = require("express-graphql");
const pgdb = require("./config/db");
const personsRoutes = require("./routes/personsRoutes");
//const gQLRoute = require("./routes/gQL");
const Schema = require("./schema");
//const Person = require("./models/Person");
const User = require("./models/User");
const Journal = require("./models/Journal");
const Entry = require("./models/Entry");
const bodyParser = require("body-parser");
const cors = require("cors");

// Setting up Schema
const { buildSchema } = require("graphql");
const schema = buildSchema(Schema);

// Setting up DB
pgdb
  .authenticate()
  .then(() => {
    console.log("PostgreSQL connected.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// Sequelize Associations
User.hasMany(Journal, { foreignKey: "authorId", onDelete: "CASCADE" });

Journal.belongsTo(User, { foreignKey: "authorId" });

Journal.hasMany(Entry, { foreignKey: "journalId", onDelete: "CASCADE" });

Entry.belongsTo(Journal, { foreignKey: "journalId" });

// --------- PERSON QUERY ---------
let getProtag = async args => {
  // let argId = args.id;
  // let personData = [];
  // try {
  //   const foundData = await Person.findAll();
  //   foundData.map(person => {
  //     personData.push(person.dataValues);
  //   });
  //   personData = await personData.filter(person => {
  //     return person.id === argId;
  //   })[0];
  // } catch (err) {
  //   personData = { error: err };
  // }
  // return personData;
};

// --------- PEOPLE QUERY ---------
let getProtags = async args => {
  // let personData = [];
  // let argId = args.userID;
  // try {
  //   let foundData = await Protags.findAll();
  //   foundData.map(person => {
  //     personData.push(person.dataValues);
  //   });
  //   if (args.country) {
  //     let argCountry = args.country;
  //     personData = await personData.filter(person => {
  //       return person.homeCountry === argCountry;
  //     });
  //   } else {
  //     return personData;
  //   }
  // } catch (err) {
  //   personData = { error: err };
  // }
  // return personData;
};

// --------- USER QUERY ---------
let getUser = async args => {
  let argId = args.userID;
  let userData;

  try {
    userData = await User.findByPk(argId, {
      include: [
        {
          model: Journal,
          include: [Entry]
        }
      ]
    });
  } catch (err) {
    userData = { error: err };
  }

  return userData;
};

// --------- USERS QUERY ---------
let getUsers = async args => {
  let userData;

  try {
    userData = await User.findAll({
      include: [
        {
          model: Journal,
          include: [Entry]
        }
      ]
    });
  } catch (err) {
    userData = { error: err };
  }

  return userData;
};

// --------- JOURNALS QUERY ---------
let getJournals = async (args, parent) => {
  // let journalData = [];
  // try {
  //   const foundData = await Journal.findAll({
  //     where: {
  //       authorId: "8de18bf0-87b5-11e9-a4fd-db0df9622246"
  //     }
  //   });
  //   journalData = foundData;
  // } catch (err) {
  //   journalData = { error: err };
  // }
  // return journalData;
};

// --------- JOURNAL QUERY ---------
let getJournal = async args => {
  let argId = args.journalId;
  let journalData = [];
  try {
    const foundData = await Journal.findByPk(argId, {
      include: [Entry],
      order: [[Entry, "updatedAt", "DESC"]]
    });
    journalData = foundData;
  } catch (err) {
    journalData = { error: err };
  }
  return journalData;
};

// --------- ENTRY QUERY ---------
let getEntry = async args => {
  let argId = args.entryId;
  let entryData = [];
  try {
    const foundData = await Entry.findByPk(argId);
    entryData = foundData;
  } catch (err) {
    entryData = { error: err };
  }
  return entryData;
};

// --------- ADD USER MUTATION ---------
let addUser = async args => {
  let { username, email, name, password, importantDates } = args;
  // let userData = {};
  try {
    const createdUser = await User.create({
      username,
      email,
      name,
      password,
      importantDates
    });
    return createdUser;
  } catch (err) {
    return { error: err };
  }
};

// --------- ADD JOURNAL MUTATION ---------
let addJournal = async args => {
  let { authorId, title, cover, tags } = args;
  // let journalData = [];
  try {
    const createdJournal = await Journal.create({
      authorId,
      title,
      cover,
      tags
    });
    return createdJournal;
  } catch (err) {
    return { error: err };
  }
  // return journalData;
};

// --------- ADD ENTRY MUTATION ---------
let addEntry = async args => {
  let { journalId, authorId, title, content, attachments, tags } = args;
  // let userData = {};
  try {
    const createdEntry = await Entry.create({
      journalId,
      authorId,
      title,
      content,
      attachments,
      tags
    });
    return createdEntry;
  } catch (err) {
    return { error: err };
  }
};

// ----- UPDATE ENTRY TITLE/CONTENT MUTATION -----
let updateEntryContent = async args => {
  let { entryId, title, content, tags } = args;
  const contentValidator = () => {
    let fields = [];

    if (title) {
      fields.push("title");
    }
    if (content) {
      fields.push("content");
    }
    if (tags) {
      fields.push("tags");
    }

    return fields;
  };
  // let userData = {};
  try {
    const updatedEntryContent = await Entry.update(
      {
        title,
        content,
        tags
      },
      {
        returning: true,
        where: { entryId: entryId },
        fields: contentValidator()
      }
    );
    let [updatedContentRows, [updatedEntry]] = updatedEntryContent;
    return updatedEntry;
  } catch (err) {
    return { error: err };
  }
};

// ----- UPDATE ENTRY ATTACHMENTS MUTATION -----
let updateEntryAttachments = async args => {
  // let { entryId, title, content, attachments, tags } = args;
  // // let userData = {};
  // try {
  //   const updatedEntryContent = await Entry.update({
  //     title,
  //     content,
  //     tags
  //   },{where: {entryId: entryId}});
  //   return createdEntry;
  // } catch (err) {
  //   return { error: err };
  // }
};

// --------- DELETE JOURNAL MUTATION ---------
let deleteJournal = async args => {
  let { journalId } = args;
  let journalData = {};
  try {
    const createdJournal = await Journal.destroy({
      where: {
        journalId: journalId
      }
    });
    journalData = createdJournal;
  } catch (err) {
    journalData = { error: err };
  }
  return journalData;
};

// --------- ENTRIES QUERY ---------
let getEntries = async (args, parent) => {
  // let entryData = [];
  // try {
  //   const foundData = await Entry.findAll({
  //     where: {
  //       journalId: "52c1183c-caa6-4550-80e5-20cfe5e0f443"
  //     }
  //   });
  //   foundData.map(user => {
  //     entryData.push(user.dataValues);
  //   });
  // } catch (err) {
  //   entryData = { error: err };
  // }
  // return entryData;
};

// --------- ROOT CREATION ---------
let root = {
  protag: getProtag,
  protags: getProtags,
  addUser: addUser,
  user: getUser,
  users: getUsers,
  addJournal: addJournal,
  deleteJournal: deleteJournal,
  journals: getJournals,
  journal: getJournal,
  addEntry: addEntry,
  updateEntryContent: updateEntryContent,
  entries: getEntries,
  entry: getEntry
};

const app = express();
const PORT = process.env.PORT || "7070";

app.use(cors());

app.use(
  "/api/graphql",
  /*cors(),*/
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true,
    rootValue: root
  })
);

app.use("/api/persons", personsRoutes);

app.get("/", (req, res) => res.send("HOME PAGE"));

app.get("/api/fake", (req, res) => res.send({ msg: "FAKE" }));

pgdb.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
});
