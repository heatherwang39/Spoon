// Recipe mongoose model

const mongoose = require("mongoose");

const Recipe = mongoose.model("Recipe", {
  // recipeId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  recipeName: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, //stores the _id of the user
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
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
    type: [String],
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
