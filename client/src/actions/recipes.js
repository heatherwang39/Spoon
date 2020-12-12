//API function calls for recipes collection

import { addToUser } from './users';

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
      console.log('json', json);
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
export const addRecipe = (component) => {
  const request = new Request('/api/recipes', {
    method: 'post',
    body: JSON.stringify(component.state),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  fetch(request)
    .then((recipe) => {
      if (recipe.status === 200) {
        alert('Successfully added the recipe!');
        addToUser(this.props.appState.username, [
          { path: '/recipes', value: recipe.json()._id },
        ]); // Add recipe to author's profile
      } else {
        // TODO: DON'T USE ALERTS
        alert('Could not upload recipe!');
      }
    })
    .catch((error) => {
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
    }
  });

  fetch(request).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      // TODO: DON'T USE ALERTS
      alert('Could not update recipe!');
    }
  });
};

export const deleteRecipe = (manageComp, recipeId) => {
  // Create our request constructor with all the parameters we need
  const request = new Request(`/api/recipes/${recipeId}`, {
    method: 'delete',
  });

  // delete the user
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log('delete the recipe successfully.');
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //get all updated users
  const url = '/api/recipes';
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json) {
        manageComp.setState({
          recipes: json,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Get a specified recipe and set state variables for thumbnail
export const getRecipe = (component, recipeId) => {
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
      console.log(json.recipe)
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
}

// check if the logged in user has liked the recipe
export const checkFollow = (component, id) => {
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
        })
      }
    })
  })
  .catch((error) => {
    console.log(error);
  });
}
