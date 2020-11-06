import { User } from '../types/user';

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
  ['user2', 'user3'],
  ['user2', 'user4'],
  [1, 2, 3],
  [4, 9],
  [4, 5, 9, 10]
);
export const user2 = new User(
  'user2',
  'user2',
  false,
  '',
  ['user1', 'user3'],
  ['user1', 'user4'],
  [4, 5],
  [2, 3, 9],
  [1, 2, 3, 9, 10]
);
export const user3 = new User(
  'user3',
  'user3',
  false,
  '',
  ['user4'],
  ['user1', 'user4'],
  [6, 7, 8],
  [1, 2, 3, 9],
  [1, 2, 3, 9, 10]
);
export const user4 = new User(
  'user4',
  'user4',
  false,
  '',
  ['user1', 'user2', 'user3'],
  ['user3'],
  [9, 10],
  [6, 7],
  [6, 7, 8]
);

export const allUsers = [user1, user2, user3, user4];
