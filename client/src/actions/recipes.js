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
    body: changes,
  });

  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        // TODO: DON'T USE ALERTS
        alert('Could not update recipe!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
