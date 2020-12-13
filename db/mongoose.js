/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require("mongoose");

/* Connect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI =
  // process.env.MONGODB_URI || "mongodb://localhost:27017/SpoonAPI";
  "mongodb+srv://heather:team18@cluster0.egzjt.mongodb.net/team18?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = { mongoose };
