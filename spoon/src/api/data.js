//These are hard coded user, recipe and tags data for phase 1. They will be replace by back-end call in phase 2.

import { User } from '../types/user';
import { Recipe } from '../types/recipe';

/*User Data Structure
{
username: "user”, // unique
password: “user”,
isAdmin: false,
avatar:url,
followers: String[username1, username2, ...],
following: String[username1, username2, ...],
recipes: int[recipeId],
liked: [recipeId],
feed: [recipeId] 
}
*/

export const user1 = new User(
  'user1',
  'user1',
  false,
  '',
  ['user3', 'user4'],
  ['user2'],
  [1],
  [1, 2, 3, 4, 5],
  [2, 5]
);
export const user2 = new User(
  'user2',
  'user2',
  false,
  '',
  ['user1'],
  ['user3'],
  [2, 5],
  [1, 2, 3, 4, 5],
  [3]
);
export const user3 = new User(
  'user3',
  'user3',
  false,
  '',
  ['user2'],
  ['user1', 'user4'],
  [3],
  [1, 2],
  [1, 4]
);
export const user4 = new User(
  'user4',
  'user4',
  false,
  '',
  ['user3'],
  ['user1'],
  [4],
  [1, 2],
  [1]
);

/*Recipe Data Structure
{
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
    '4.Make ahead freezing.',
    '5.Sprinkle pizza peel with corn meal, put flattened dough on top.',
  ],
  4,
  1,
  45,
  ['Lunch', 'Dinner', 'NutFree'],
  'https://media4.s-nbcnews.com/j/newscms/2020_09/3246761/plain_pizza_f431dcc55520ce41f835a97a5383f171.fit-760w.jpg',
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
  1,
  30,
  ['Breakfast', 'Lunch', 'Dinner', 'Vegan', 'NutFree'],
  'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/baked-potato-500x500.jpg',
  4
);

export const recipe3 = new Recipe(
  3,
  'Fried Sprouts',
  'user3',
  [
    '6 slices bacon',
    '1/2 onion',
    '12 ounce package fresh Brussels sprouts',
    'salt and ground black pepper',
  ],
  [
    '1.Place bacon pieces in a large skillet and cook over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Drain on paper towels, leaving grease in the skillet.',
    '2.Cook onion in the bacon grease in the skillet until translucent, about 5 minutes. Add Brussels sprouts and toss to coat in the bacon grease. Cook and stir until browned and tender, about 5 minutes. Stir in sugar, salt, and black pepper; sprinkle in bacon pieces.',
  ],
  4,
  0,
  35,
  ['Lunch', 'Dinner', 'Vegan', 'NutFree'],
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4235076.jpg&w=595&h=595&c=sc&poi=face&q=85',
  2
);

export const recipe4 = new Recipe(
  4,
  'Glazed Shrimp',
  'user4',
  [
    '1/4 cup Chinese plum sauce',
    '1/4 cup ketchup',
    '2 teaspoons soy sauce',
    '1 1/4 pounds medium shrimp',
    'salt and freshly ground black pepper',
    '1 clove garlic',
  ],
  [
    '1.Stir together the plum sauce, ketchup, soy sauce and pepper flakes in a small bowl and set aside.',
    '2.Sprinkle the shrimp with salt and pepper. Heat the oil in a medium skillet over medium-high heat. Add the shrimp to the skillet and cook, stirring occasionally, until just cooked through, 2 to 3 minutes. Transfer to a plate.',
    '3.Add the scallion whites, garlic and ginger to the skillet and cook, stirring constantly, until soft, about 1 minute. Add the vinegar and scrape up any brown bits that cling to the bottom of the skillet. Add the plum-ketchup sauce and bring to a simmer. ',
  ],
  4,
  0,
  15,
  ['Lunch', 'Dinner'],
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/4/1/1/LS-Library_Sweet-Sour-Glazed-Shrimp_s4x3.jpg.rend.hgtvcom.826.620.suffix/1522651448204.jpeg',
  2
);

export const recipe5 = new Recipe(
  5,
  'Garlic Kale',
  'user2',
  ['1 bunch kale', '1 tablespoon olive oil', '1 teaspoon minced garlic'],
  [
    '1.Soak kale leaves in a large bowl of water until dirt and sand begin to fall to the bottom, about 2 minutes. Lift kale from the bowl without drying the leaves and immediately remove and discard stems. Chop the kale leaves into 1-inch pieces.',
    '2.Heat olive oil in a large skillet over medium heat; cook and stir garlic until sizzling, about 1 minute. Add kale to the skillet and place a cover over the top.',
    '3.Cook, stirring occasionally with tongs, until kale is bright green and slightly tender, 5 to 7 minutes.',
  ],
  2,
  0,
  25,
  ['Breakfast', 'Lunch', 'Dinner', 'Vegan', 'NutFree'],
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F2094708.jpg&w=596&h=399&c=sc&poi=face&q=85',
  2
);

//hard coded tags, will be replaced by back end call in phase 2
export const tags = {
  Breakfast: [2, 5],
  Lunch: [1, 2, 3, 4, 5],
  Dinner: [1, 2, 3, 4, 5],
  Dessert: [],
  Vegan: [2, 3, 5],
  NutFree: [2, 3, 5],
};

export const allUsers = [user1, user2, user3, user4];
export const allRecipes = [recipe1, recipe2, recipe3, recipe4, recipe5];
