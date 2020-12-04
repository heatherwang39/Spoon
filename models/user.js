// User mongoose model

const mongoose = require("mongoose");

const User = mongoose.model("User", {
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

module.exports = { User };
