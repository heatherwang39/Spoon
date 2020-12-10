const mongoose = require("mongoose");

// Image mongoose model for recipe photos
const imageSchema = mongoose.Schema({
  image_id: {
      type: String,
      required: true
  },
  image_url: {
      type: String,
      required: true,
      default: 'https://www.lesgeveninzeeland.nl/storage/media/350/placeholder.png',
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
    type: imageSchema,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const Recipe = mongoose.model('recipe', RecipeSchema);
const Image = mongoose.model('image', imageSchema);

module.exports = { Recipe, Image };
