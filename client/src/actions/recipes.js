//API function calls for recipes collection

import { addToUser } from './users';
import {
  deleteRecipeFromLikedList,
  deleteRecipeFromFeedPage,
  deleteRecipeFromOwners,
} from './manage';

// A function to send a GET request to the web server
// to get all the recipes
export const allRecipes = (recipeList) => {
  fetch('/api/recipes')
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        recipeList.setState({ openWarning: true });
      }
    })
    .then((json) => {
      recipeList.setState({ recipes: json });
    })
    .catch((error) => {
      console.log(error);
    });
};

// A functon to update the search user form while input changes
export const updateSearchRecipeForm = (searchComp, field) => {
  const value = field.value.toLowerCase();

  searchComp.setState({
    searchedRecipe: value,
  });
};

// Upload the recipe photo to Cloudinary
export const changeRecipePhoto = (image, component) => {
  const form = new FormData(image);

  const request = new Request('/api/images', {
    method: 'post',
    body: form,
  });

  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        // TODO: DON'T USE ALERTS
        alert('Could not upload the image');
      }
    })
    .then((image) => {
      component.setState({
        recipePhoto: image,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// send a POST request with a new recipe
export const addRecipe = (component, username) => {
  const body = component.state;
  body.owner = username;
  const request = new Request('/api/recipes', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  fetch(request)
    .then((recipe) => {
      if (recipe.status === 200) {
        console.log('recipe created!');
        return recipe.json();
      } else {
        // TODO: DON'T USE ALERTS
        alert('Could not create recipe!');
      }
    })
    .then((json) => {
      newRecipeUpdates(json);
    })
    .catch((error) => {
      console.log('Could not create recipe');
      console.log(error);
    });
};

// Update recipe info
export const updateRecipe = (recipeId, changes) => {
  // Changes should be an array of {path, value} objects
  const url = '/api/recipes/' + recipeId;
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify(changes),
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        alert('Could not update recipe!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateRecipeForEdit = (recipeId, changes) => {
  // Changes should be an array of {path, value} objects
  const url = '/api/recipes/' + recipeId;
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify(changes),
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json',
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        alert('Recipe edited! You can close the window now.');
        return res.json();
      } else {
        alert('Could not update recipe!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const newRecipeUpdates = (recipe) => {
  //updates to do after creating a recipe

  const url = `/api/users/currentUser`;
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        console.log('Could not get user');
      }
    })
    .then((json) => {
      json.user.recipes.push(recipe._id);
      addToUser(json.user._id, [
        // Add recipe to author's profile
        { path: '/recipes', value: json.user.recipes },
      ]);

      json.user.followers.forEach((followerId) => {
        // Add recipe to followers' feeds
        updateFeed(followerId, recipe);
      });

      alert('Successfully added the recipe!');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateFeed = (id, recipe) => {
  const url = `/api/users/${id}`;
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        console.log('Could not add recipe to follower');
      }
    })
    .then((json) => {
      const feed = json.user.feed;
      if (feed.length === 9) {
        feed.shift();
      }
      feed.push(recipe);
      addToUser(id, [{ path: '/feed', value: feed }]);
    }); //json is user object
};

export const deleteRecipe = async (manageComp, recipeId) => {
  // Create our request constructor with all the parameters we need
  const request = new Request(`/api/recipes/${recipeId}`, {
    method: 'delete',
  });
  const url = '/api/recipes';
  // delete the recipes
  try {
    const res = await fetch(request);
    if (res.status === 200) {
      manageComp.setState({
        openAlert: true,
        alertMessage: 'Deleted the recipe successfully.',
      });
      const resGet = await fetch(url);
      const json = await resGet.json();
      manageComp.setState({
        recipes: json,
      });
      deleteRecipeFromLikedList(recipeId);
      deleteRecipeFromFeedPage(recipeId);
      deleteRecipeFromOwners(recipeId);
    } else {
      manageComp.setState({
        openAlert: true,
        alertMessage: 'Could not delete recipe.',
      });
    }
    const resGet = await fetch(url);
    const json = await resGet.json();
    manageComp.setState({
      recipes: json,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get a specified recipe and set state variables for editing
export const getRecipeToEdit = (component, recipeId) => {
  const url = `/api/recipes/${recipeId}`;
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        console.log('Could not get recipe');
      }
    })
    .then((json) => {
      component.setState({
        recipeNameEdit: json.recipe.recipeName,
        ownerEdit: json.recipe.owner,
        ingredientsEdit: json.recipe.ingredients,
        instructionsEdit: json.recipe.instructions,
        servingSizeEdit: json.recipe.servingSize,
        cookTimeHrsEdit: json.recipe.cookTimeHrs,
        cookTimeMinsEdit: json.recipe.cookTimeMins,
        tagsEdit: json.recipe.tags,
        recipePhotoEdit: json.recipe.recipePhoto,
        likesEdit: json.recipe.likes,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Get a specified recipe and set state variables for thumbnail
export const getRecipe = (component, recipeId) => {
  const url1 = `/api/recipes/${recipeId}`;
  fetch(url1)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        console.log('Could not get recipe');
      }
    })
    .then((json) => {
      component.setState({
        recipeName: json.recipe.recipeName,
        owner: json.recipe.owner,
        ingredients: json.recipe.ingredients,
        instructions: json.recipe.instructions,
        servingSize: json.recipe.servingSize,
        cookTimeHrs: json.recipe.cookTimeHrs,
        cookTimeMins: json.recipe.cookTimeMins,
        tags: json.recipe.tags,
        recipePhoto: json.recipe.recipePhoto.image_url,
        likes: json.recipe.likes,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  const url2 = '/api/users';
  fetch(url2)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        console.log('Could not get users');
      }
    })
    .then((json) => {
      json.forEach((user) => {
        if (user.username === component.state.owner) {
          component.setState({
            ownerId: user._id,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// check if the logged in user has liked the recipe
export const checkLiked = (component, id) => {
  const url = '/api/users/currentUser';
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        console.log('Could not get user');
      }
    })
    .then((json) => {
      json.user.liked.forEach((rid) => {
        if (rid === id) {
          component.setState({
            liked: true,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
