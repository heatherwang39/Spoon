import { User } from '../types/user';
import { Recipe } from '../types/recipe';

/*{
username: ”user”, // unique
password: “user”,
isAdmin: false,
avatar:url,
followers: String[username1, username2, ...],
following: String[username1, username2, ...],
recipes: int[recipeId],
liked: [recipeId],
feed: [recipeId] // list of 9 or 12, kick out old ones when new ones come in
}
*/

export const user1 = new User(
  'user1',
  'user1',
  false,
  '',
  ['user4'],
  ['user2'],
  [1],
  [2],
  [2]
);
export const user2 = new User(
  'user2',
  'user2',
  false,
  '',
  ['user1'],
  ['user3'],
  [2],
  [3],
  [3]
);
export const user3 = new User(
  'user3',
  'user3',
  false,
  '',
  ['user2'],
  ['user4'],
  [3],
  [4],
  [4]
);
export const user4 = new User(
  'user4',
  'user4',
  false,
  '',
  ['user3'],
  ['user1'],
  [4],
  [1],
  [1]
);

/*{
  recipeId:int, // unique
  recipeName: “”,
  owner:the owner's username,
  ingredients: String[ ],
  instructions: String[ ],
  servingSize: int,
  cookTimeHrs: int,
  cookTimeMins: int,
  tags: String[ ],
  recipePhoto: “www.coverimage.com/fileAddress”
  likes:int
  },
 */
export const recipe1 = new Recipe(
  1,
  'Homemade Pizza',
  'user1',
  ['1/2 cup shredded Cheese', '1/2 cup Flour', '1 medium Tomato'],
  [
    '1.Place the warm water in the large bowl of a heavy duty stand mixer. Sprinkle the yeast over the warm water and let it sit for 5 minutes until the yeast is dissolved.',
    '2.Add the flour, salt, sugar, and olive oil, and using the mixing paddle attachment, mix on low speed for a minute. Then replace the mixing paddle with the dough hook attachment.',
    '3.Let the dough rise: Spread a thin layer of olive oil over the inside of a large bowl. Place the pizza dough in the bowl and turn it around so that it gets coated with the oil.',
    '4.MAKE ahead freezing',
    '5.Sprinkle pizza peel with corn meal, put flattened dough on top',
  ],
  4,
  1,
  ['Lunch', 'Dinner', 'NutFree'],
  '',
  4
);

export const recipe2 = new Recipe(
  2,
  'Baked Potatoes',
  'user2',
  ['2 teaspoons Butter', '2 large Potato', '1.5 teaspoons Black Pepper'],
  [
    '1.Preheat the oven to 300 degrees F (150 degrees C). Scrub the potato, and pierce the skin several times with a knife or fork. Rub the skin with olive oil, then with salt.',
    '2.Place the potato in the preheated oven, and bake for 90 minutes, or until slightly soft and golden brown. Slice the potato down the center, and serve with butter and black pepper. Sprinkle shredded Cheddar cheese over the top, if desired.',
  ],
  2,
  0,
  ['Lunch', 'Dinner', 'Vegan', 'NutFree'],
  '',
  4
);

export const tags = {
  Breakfast: [],
  Lunch: [1, 2],
  Dinner: [1, 2],
  Dessert: [],
  Vegan: [2],
  NutFree: [2],
};

export const allUsers = [user1, user2, user3, user4];
export const allRecipes = [recipe1, recipe2];
