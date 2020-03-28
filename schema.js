let schema = `
type Query {
    protag(userID: ID!, id: Int!): Protag
    protags(userID: ID!): [Protag]
    user(userID: ID!): User
    users: [User]
    journal(journalId: ID!): Journal
    journals: [Journal]
    entry(entryId: ID!): Entry
    entries(journalId: Int!): [Entry]
},
type Mutation {
  addJournal(authorId: ID!, title: String!, cover: String, tags: [String]): Journal

  addUser(username: String, email: String!, name: String, password: String!, importantDates: [String]): User

  addEntry(journalId: ID!, authorId: ID!, title: String!, content: String, attachments: [String], tags: [String]): Entry

  updateEntryContent(entryId: ID!, title: String, content: String, tags: [String]): Entry

  deleteJournal(journalId: ID!): Journal
}, 
type Protag {
  protagId: Int
  name: String
  birthday: String
  faveColor: String
  homeCountry: String
  age: Int
  career: String
},
type User {
  userID: ID
  username: String
  email: String
  name: String
  password: String
  importantDates: [String]
  protags: [Protag]
  journals: [Journal]
},
type Journal {
  journalId: ID
  authorId: String
  title: String
  cover: String
  entries: [Entry]
  tags: [String]
},
type Entry {
  entryId: ID
  journalId: ID
  authorId: ID
  title: String
  content: String
  attachments: [String]
  tags: [String]
}

`;

module.exports = schema;
