/* server.js for team 18 spoon project */

"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();
const path = require("path");

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");
const { Recipe } = require("./models/recipe");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  } else {
    next();
  }
};

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// Route for adding a user
/* 
Request body expects:
{
  "username": <username>,
  "password": <password>,
  "isAdmin": <boolean>
}
Returned JSON should be the database document added.
*/
// POST /users
app.post('/users', mongoChecker, (req, res) => {

	// Create a new restaurant
	const user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
		avatar: "",
    followers: [],
    following: [],
    recipes: [],
    liked: [],
    feed: []
	})

	user.save().then((user) => {
		res.send(user)
	}).catch((error) => {
		// log server error to the console, not to the client.
		log(error)
    // check for if mongo server suddenly dissconnected before this request.
    if (isMongoError(error)) { 
      res.status(500).send('Internal server error')
    } else {
      // 400 for bad request gets sent to client.
      res.status(400).send('Bad Request') 
    }
	})
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
