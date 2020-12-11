// User mongoose model

const mongoose = require("mongoose");
// const validator = require('validator')
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  recipes: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  liked: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  feed: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified("password")) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this; // binds this to the User model

  // First find the user by their username
  return User.findOne({ username: username }).then((user) => {
    if (!user) {
      return Promise.reject(); // a rejected promise
    }
    // if the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
