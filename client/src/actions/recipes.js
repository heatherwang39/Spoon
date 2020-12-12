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
        console.log("recipe created!")
        return recipe.json()
      } else {
        // TODO: DON'T USE ALERTS
        alert('Could not create recipe!');
      }
    })
    .then((json)=>{
      newRecipeUpdates(json)
    })
    .catch((error) => {
      console.log("Could not create recipe");
      console.log(error);
    });
};

// Update recipe info
export const updateRecipe = (recipeId, changes) => {
  // Changes should be an array of {path, value} objects
  const url = '/api/recipes/' + recipeId;
  const request = new Request(url, {
    method: 'PATCH',
    body: changes,
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
    console.log("user", json.user)
    addToUser(json.user._id , [ // Add recipe to author's profile
      { 'path': '/recipes', 'value': recipe },
    ]); 
    
    json.user.followers.forEach((followerId) => { // Add recipe to followers' feeds
      console.log("follower id:", followerId)
      updateFeed(followerId, recipe)
    })

    alert('Successfully added the recipe!');
  })    
  .catch((error) => {
    console.log(error);
  });
}

export const updateFeed = (id, recipe) => {
  const url = `/api/users/${id}`;
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json();
    } else {
      console.log("Could not add recipe to follower");
    }
  })
  .then((json) => {
    const feed = json.user.feed
    if (feed.length == 9){
      feed.shift()
    }
    feed.push(recipe)
    addToUser(id, [{'path':'/feed', 'value': feed }])
  })//json is user object
}

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
