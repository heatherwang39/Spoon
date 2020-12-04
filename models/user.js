// User mongoose model

const mongoose = require('mongoose');

const User = mongoose.model('User', {
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
    type: Array,
    required: true,
  },
  following: {
    type: Array,
    required: true,
  },
  recipes: {
    type: Array,
    required: true,
  },
  liked: {
    type: Array,
    required: true,
  },
  feed: {
    type: Array,
    required: true,
  },
});

module.exports = { User };
