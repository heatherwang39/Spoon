//API function calls for recipes collection

import { addToUser } from './users';

// A function to send a GET request to the web server
// to get all the recipes
export const allRecipes = (recipeList) => {
  const url = '/api/recipes';

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        recipeList.setState({ openWarning: true });
      }
    })
    .then((json) => {
      recipeList.setState({ recipes: json.recipes });
    })
    .catch((error) => {
      console.log(error);
    });
};

// Upload the recipe photo to Cloudinary
export const changeRecipePhoto = (image, component) => {
  const form = new FormData();
  const url = '/api/images';

  form.append('image', image);
  const request = new Request(url, {
    method: 'post',
    body: form,
  });

  fetch(request)
    .then(function (res) {
      if (res.status === 200) {
        return res.json();
      } else {
          // TODO: DO NOT USE ALERTS
        alert('Could not upload the image');
      }
    })
    .then((data) => {
      component.setState({
        recipePhoto: data.image_url,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// TODO: REWRITE ADD RECIPE FUNCTION
// send a POST request with a new recipe (also save image)
export const addRecipe = (component) => {
    //first save image and get image's cloudinary id, then save recipe containing image id
    const img_request = new Request('/api/images', {
      method: 'post',
      body: component.state.recipePhoto,
    });
    console.log("helloooo")
    console.log(img_request)
  
    // Send the requests with fetch()  
    fetch(img_request)
    .then((res) => {
      alert(res.json.stringify)//delete later
      if (res.status === 200) {
        //returns image schema of saved image
        return res.json();
      } else {
        // TODO: DON'T USE ALERTS
        alert('Could not upload image!');
      }
    })
    .then((json) => {
      addRecipeHelper(component, json)
    })
    .then((recipeId) => {
      addToUser(this.props.appState.username, [{path: '/recipes', value: recipeId}]) //add recipe to author's profile
    })
  
  }
  
  //helper function for adding recipes
  export const addRecipeHelper = (component, imageSchema) => {
  
    const request = new Request('/api/recipe', {
      method: 'post',
      body: {
        recipeContents: component.state,
        imageSchema: imageSchema
      }
    });
  
    fetch(request)
      .then((recipe) => {
        if (recipe.status === 200) {
          return recipe.json()._id;
        } else {
          // TODO: DON'T USE ALERTS
          alert('Could not upload recipe!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };