# Spoon: Recipe Site

Welcome to Spoon! A social media-esque web application where users can share and view recipes with others. 

## Demo

You can access the site [here](https://stormy-beach-31181.herokuapp.com).

## Development

You can also run this locally by following the steps below.Start your local Mongo database. In a separate terminal window:

```
mkdir mongo-datamongod --dbpath
mongo-data
```

In the root directory of the repo, run:

```
npm install
cd client
npm install
npm run build
cd ..
npm start
```

The site will be on http://localhost:5000/.

## Login Credentials

Users can create their own account, or preview the website as a guest. There are a few accounts with login info that you can experiment with:

| Username | Password |
| -------- | -------- |
| admin    | admin    |
| user     | user     |

### Guest Functionality

- Explore the Discover page (all the recipes in the site)
- Search for recipes (filtered by name, tags, cook time etc)
- Search for users
- View user profiles
- Create an account
- Sign in

### User Functionality

Users have all of the aforementioned functionalities as well as the ability to

- Explore their Feed (recipes from users they follow) 
- Create, edit and delete their own recipes
- Follow and unfollow other users
- View their own profile 
- Like recipes and access their liked recipes on their profile
- Log out

### Admin Functionality

Administrators have all of the aforementioned functionalities as well as the ability to

- Manage users (delete)
- Manage any recipe (delete)

## Features

Here are a few examples of possible interactions with the site:

- Create recipe
<img height="300" src="./images/create_recipe.png"/>

## Routes

### Session

- `USE`: Create a session and session cookie
- `POST /users/login`:  Login with the `username` and `password` fields in the request body and creates a session
- `GET /users/logout`: Logout the user and remove the session
- `GET /users/check-session `: Checks whether or not a user is logged into a session

### Users

- `GET /api/users/currentUser`: Gets the user that is currently logged in

  - Returns JSON of the user that is currently logged in

- `POST /api/users`: Creates a new user

  - Expects 

  ```
  {
    "username": <username>,
    "password": <password>,
    "isAdmin": <boolean>
  }
  ```

  - Returns JSON of the database document added

- `DELETE /api/users/:id`: Deletes the user with id `id`

  - Returns JSON of the database document deleted

- `PATCH /api/users:id`: Route for making changes to a user

  - Expects

  ```
  [
    { "path": "/followers", "value": ["user1", "user2"] },
    { "path": "/liked", "value": [recipe1Id, recipe2Id, recipe3Id]}
    ...
  ]
  ```

  - Returns JSON of the database document updated

- `GET /api/users`: Gets all the users in the database

  - Returns JSON of all the users

- `GET /api/users/:id`: Gets a specific user in the database with id `id`

  - Returns JSON of the database document

### Images

- `POST /api/images`: Adds the imageSchema to our Cloudinary server
- `DELETE /api/images/:id`: Deletes the image with id `id` from the Cloudinary server

### Recipes

- `POST /api/recipes`: Creates a new recipe

  - Expects 

  ```
  {
    "recipeName": <recipe name>,
    "owner": <owner>,
    "ingredients": <list of ingredients>,
    "instructions": <list of instructions>,
    "servingSize": <serving size>,
    "cookTimeHrs": <cook time in hours>,
    "cookTimeMins": <cook time in minutes,
    "tags": <list of tags>,
    "recipePhoto": <ImageSchema>,
    "likes": <likes>
  }
  ```

  - Returns JSON of the database document added

- `DELETE /api/recipes/:id`: Deletes the recipe with id `id`

  - Returns JSON of the database document deleted

- `PATCH /api/recipe/:id`: Route for making changes to a recipe

  - Expects

  ```
  [
    { "path": "/recipeName", "value": <new recipe name> },
    { "path": "/servingSize", "value": <new serving size> },
    ...
  ]
  ```

  - Returns JSON of the database document updated

- `GET /api/recipes`: Gets all the recipes in the database

  - Returns JSON of all the recipes

- `GET /api/recipes/:id`: Gets a specific recipe in the database with id `id`

  - Returns JSON of the database document

## Third-Party Libraries

- Material-UI/core
- Material-UI/icons
- Material-UI/lab
- React-uid
- ESLint
