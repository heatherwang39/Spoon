// Methods in this file modifies the ManageUser and ManageRecipe component state

// A functon to get all users
export const getAllUsers = (manageComp) => {
  const url = '/api/users';

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json) {
        manageComp.setState({
          users: json,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// A functon to update the search user form while input changes
export const updateSearchUserForm = (searchComp, field) => {
  const value = field.value.toLowerCase();

  searchComp.setState({
    searchedName: value,
  });
};

export const deleteUser = (manageComp, userId) => {
  // Create our request constructor with all the parameters we need
  const request = new Request(`/api/users/${userId}`, {
    method: 'delete',
  });

  // delete the user
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log('delete the user successfully.');
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //get all updated users
  const url = '/api/users';
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json) {
        manageComp.setState({
          users: json,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const deleteRecipe = (manage, recipe) => {
//   const recipesToKeep = manage.state.recipes.filter((r) => {
//     return r !== recipe;
//   });
//   manage.setState({
//     recipes: recipesToKeep,
//   });
//   alert('Recipe ' + recipe.recipeName + ' has been deleted!');
// };
