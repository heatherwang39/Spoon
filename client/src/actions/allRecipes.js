// A function to send a GET request to the web server
// to get all the recipes
export const allRecipes = (recipeList) => {
  const url = 'http://localhost:5000/api/recipes';

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
