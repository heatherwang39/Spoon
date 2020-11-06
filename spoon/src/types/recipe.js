export class Recipe {
  constructor(
    recipeId,
    recipeName,
    owner,
    ingredients,
    instructions,
    servingSize,
    cookTimeHrs,
    cookTimeMins,
    tags,
    recipePhoto,
    likes
  ) {
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.owner = owner;
    this.ingredients = ingredients || [];
    this.instructions = instructions || [];
    this.servingSize = servingSize;
    this.cookTimeHrs = cookTimeHrs;
    this.cookTimeMins = cookTimeMins;
    this.tags = tags || [];
    this.recipePhoto = recipePhoto || '';
    this.likes = likes;
  }
}
export default Recipe;
