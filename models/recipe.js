// Recipe mongoose model

const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe', {
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  instructions: {
    type: Array,
    required: true,
  },
  servingSize: {
    type: Number,
    required: true,
    min: 1,
  },
  cookTimeHrs: {
    default: 0,
    min: 0,
  },
  cookTimeMins: {
    type: Number,
    required: true,
    min: 1,
  },
  tags: {
    type: Array,
    required: true,
  },
  recipePhoto: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

module.exports = { Recipe };
