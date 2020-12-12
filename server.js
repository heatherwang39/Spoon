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
const { Recipe, Image } = require("./models/recipe");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//cors (connecting ports)
const cors = require("cors");
app.use(cors());

// express-session for managing user sessions
const session = require("express-session");
const { mongo } = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));

// cloudinary
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "spoonimages",
  api_key: "987758156522799",
  api_secret: "FJUyYJawLTF73AZr74G0fDyKkHI",
});
// multipart middleware: allows you to access uploaded file from req.file
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

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

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        } else {
          req.user = user;
          next();
        }
      })
      .catch((error) => {
        res.status(401).send("Unauthorized");
      });
  } else {
    res.status(401).send("Unauthorized");
  }
};

// Middleware for authentication of resources that only admins have access to
const adminAuthenticate = (req, res, next) => {
  if (req.session.userId && req.session.userMode == "admin") {
    User.findById(req.session.userId)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        } else {
          req.user = user;
          next();
        }
      })
      .catch((error) => {
        res.status(401).send("Unauthorized");
      });
  } else {
    res.status(401).send("Unauthorized");
  }
};

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: true,
    },
  })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //   log(username, password);
  // Use the static method on the User model to find a user
  // by their email and password
  User.findByUsernamePassword(username, password)
    .then((user) => {
      log(user);
      // Add the user's id to the session.
      // We can check later if this exists to ensure we are logged in.
      req.session.userId = user._id;
      req.session.username = user.username; // we will later send the username to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
      let checkedMode;
      if (user.isAdmin == true) {
        checkedMode = "admin";
      } else {
        checkedMode = "user";
      }
      req.session.userMode = checkedMode;
      res.send({ username: user.username, userMode: checkedMode });
      log(req.session);
    })
    .catch((error) => {
      log(error);
      res.status(400).send();
    });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
  // Remove the session
  const usernameBeforeLogout = req.session.username;
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send({ username: usernameBeforeLogout });
    }
  });
});

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
  // log(req.session);
  if (req.session.username) {
    res.send({
      username: req.session.username,
      userMode: req.session.userMode,
    });
  } else {
    res.status(401).send();
  }
});

// get the currently logged-in user
// returned json is user document
app.get("/api/users/currentUser", mongoChecker, (req, res) => {

  if (!ObjectID.isValid(req.session.userId)) {
    res.status(404).send();
    return; // so that we don't run the rest of the handler.
  }

  if (req.session.userId) {
    User.findById(req.session.userId)
      .then((user) => {
        if (!user) {
          res.status(404).send("Resource not found");
        } else {
          console.log(user)
          res.send({ user });
        }
      })
      .catch((error) => {
        log(error);
        res.status(500).send("Internal Server Error"); // server error
      });
  } else {
    res.status(404).send("Resource not found");
  }
});

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
app.post("/api/users", mongoChecker, (req, res) => {
  // Create a new user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    followers: [],
    following: [],
    recipes: [],
    liked: [],
    feed: [],
  });

  // add a user
  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      // log server error to the console, not to the client.
      log(error);
      // check for if mongo server suddenly dissconnected before this request.
      if (isMongoError(error)) {
        res.status(500).send("Internal server error");
      } else {
        // 400 for bad request gets sent to client.
        res.status(400).send("Bad Request");
      }
    });
});

// Route for deleting a user
// Returned JSON should be the database document removed.
// DELETE /users.:id
app.delete("/api/users/:id", mongoChecker, adminAuthenticate, (req, res) => {
  const id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send("Resource not found");
    return;
  }

  // delete a user by their id
  User.findByIdAndRemove(id)
    .then((user) => {
      if (!user) {
        res.status(404).send();
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send();
    });
});

// Route for making changes to a user
// The body will be an array that consists of a list of changes to make to the
// user:
/*
[
  { "path": "/followers", "value": ["user1", "user2"] },
  ...
]
Returned JSON should be the database document updated.
*/
// PATCH /users/:id
app.patch("/api/users/:id", mongoChecker, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return; // so that we don't run the rest of the handler.
  }

  // Find the fields to update and their values.
  const fieldsToUpdate = {};
  req.body.map((change) => {
    const propertyToChange = change.path.substr(1); // getting rid of the '/' character
    fieldsToUpdate[propertyToChange] = change.value;
  });

  // update a user by their id
  User.findOneAndUpdate(
    { _id: id },
    { $set: fieldsToUpdate },
    { new: true, useFindAndModify: false }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      log(error);
      if (isMongoError(error)) {
        res.status(500).send("Internal server error");
      } else {
        res.status(400).send("Bad Request");
      }
    });
});

//get all users
//returned json is list of users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    log(error); // log server error to the console, not to the client.
    if (isMongoError(error)) {
      // check for if mongo server suddenly dissconnected before this request.
      res.status(500).send("Internal server error");
    } else {
      res.status(400).send("Bad Request"); // 400 for bad request gets sent to client.
    }
  }
});

//get specific user
//returned json is user document
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return; // so that we don't run the rest of the handler.
  }

  //check mongoose connection
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  //
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found");
      } else {
        res.send({ user });
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error"); // server error
    });
});

// Add recipe image to cloudinary server
app.post("/api/images", multipartMiddleware, (req, res) => {
  cloudinary.uploader.upload(req.files.image.path, function (result) {
    var img = new Image({
      image_id: result.public_id,
      image_url: result.url,
    });

    img.save().then(
      (saveImg) => {
        res.send(saveImg);
      },
      (error) => {
        res.status(400).send("Bad request");
      }
    );
  });
});

/// Remove recipe image from cloudinary server by its id
app.delete("/api/images/:id", (req, res) => {
  const imageId = req.params.imageId;

  cloudinary.uploader.destroy(imageId, function (result) {
    models.Image.findOneAndRemove({ image_id: imageId })
      .then((img) => {
        if (!img) {
          res.status(404).send();
        } else {
          res.send(img);
        }
      })
      .catch((error) => {
        res.status(500).send();
      });
  });
});

// Route for adding a recipe
/* Request body expects:
{
  "recipeName": <recipe name>,
  "owner": <owner>,
  "ingredients": <list of ingredients>,
  "instructions": <list of instructions>,
  "servingSize": <serving size>,
  "cookTimeHrs": <cook time in hours>,
  "cookTimeMins": <cook time in minutes,
  "tags": <list of tags>,
  "recipePhoto": <ImageSchema>,
  "likes": <likes>
}
*/
// Returned json should be the added recipe document
app.post("/api/recipes", async (req, res) => {
  // Check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // Create a new recipe using the Recipe mongoose model
  const recipe = new Recipe({
    recipeName: req.body.recipeName,
    owner: req.body.owner,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    servingSize: req.body.servingSize,
    cookTimeHrs: req.body.cookTimeHrs,
    cookTimeMins: req.body.cookTimeMins,
    tags: req.body.tags,
    recipePhoto: req.body.recipePhoto,
    likes: req.body.likes,
  });

  recipe
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      log(error); // log server error to the console, not to the client.
      if (isMongoError(error)) {
        // check for if mongo server suddenly dissconnected before this request.
        res.status(500).send("Internal server error");
      } else {
        res.status(400).send("Bad Request"); // 400 for bad request gets sent to client.
      }
    });
});

//delete recipe
//returned json is recipe document
app.delete("/api/recipes/:id", authenticate, async (req, res) => {
  const id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send("Resource not found");
    return;
  }

  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  Recipe.findByIdAndRemove(id)
    .then((recipe) => {
      if (!recipe) {
        res.status(404).send();
      } else {
        res.send(recipe);
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send(); // server error, could not delete.
    });
});

// Route for making changes to a recipe
/* Request body expects:
[
  { "op": "replace", "path": "/recipeName", "value": <new recipe name> },
  { "op": "replace", "path": "/servingSize", "value": <new serving size> },
  ...
]
*/
// Returned json should be the edited recipe document
app.patch("/api/recipes/:id", mongoChecker, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // Find the fields to update and their values.
  const fieldsToUpdate = {};
  req.body.map((change) => {
    const propertyToChange = change.path.substr(1); // getting rid of the '/' character
    fieldsToUpdate[propertyToChange] = change.value;
  });

  // update a recipe by its id
  Recipe.findOneAndUpdate(
    { _id: id },
    { $set: fieldsToUpdate },
    { new: true, useFindAndModify: false }
  )
    .then((recipe) => {
      if (!recipe) {
        res.status(404).send("Resource not found");
      } else {
        res.send(recipe);
      }
    })
    .catch((error) => {
      log(error);
      if (isMongoError(error)) {
        res.status(500).send("Internal server error");
      } else {
        res.status(400).send("Bad Request");
      }
    });
});

// a GET route to get all recipes
app.get("/api/recipes", mongoChecker, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    log(error);
    res.status(500).send("Internal Server Error");
  }
});

// a GET route to get a specific recipe
app.get("/api/recipes/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) {
        res.status(404).send("Resource not found");
      } else {
        res.send({ recipe });
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = [
    "/",
    "/Feed",
    "/ManageUsers",
    "/ManageRecipes",
    "/Search",
    "/RecipeCreate",
    "/AccountCreate",
    "/SignIn",
    "/LogOut",
    "/UserProfile",
    "/Unauthorized",
  ];
  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
  }
  // send index.html
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, mongoChecker, () => {
  log(`Listening on port ${port}...`);
});
