const mongoose = require("mongoose");

// Image mongoose model for recipe photos
const imageSchema = mongoose.Schema({
  image_id: {
      type: String,
  },
  image_url: {
      type: String,
  },
});

// Recipe mongoose model

const RecipeSchema = new mongoose.Schema({
  // recipeId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  recipeName: {
    type: String,
    minlegth: 1,
    trim: true,
  },
  owner: {
    type: String, //stores the string of the user's uername
  },
  ingredients: {
    type: [String],
  },
  instructions: {
    type: [String],
  },
  servingSize: {
    type: Number,
    min: 1,
  },
  cookTimeHrs: {
    type: Number,
    default: 0,
    min: 0,
  },
  cookTimeMins: {
    type: Number,
    min: 1,
  },
  tags: {
    type: [String],
  },
  recipePhoto: {
    type: imageSchema,
  },
  likes: {
    type: Number,
  },
});

const Recipe = mongoose.model('recipe', RecipeSchema);
const Image = mongoose.model('image', imageSchema);

module.exports = { Recipe, Image };
