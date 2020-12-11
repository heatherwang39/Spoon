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

export const updateSearchForm = (searchComp, field) => {
  const value = field.value.toLowerCase();

  searchComp.setState({
    searchedName: value,
  });
};

export const deleteUser = (manage, userId) => {
  // Create our request constructor with all the parameters we need
  // const request = new Request(`/api/users/${userId}`, {
  //   method: 'delete',
  // });

  // // Send the request with fetch()
  // fetch(request)
  // .then((res) => {
  //   if (res.status === 200) {
  //     return res.json();
  //   }
  // })
  // .then((json) => {
  //   if (json.username !== undefined) {
  //     app.setState({
  //       username: json.username,
  //       userMode: json.userMode,
  //     });
  //   }
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  const usersToKeep = manage.state.users.filter((u) => {
    return u !== user;
  });
  manage.setState({
    users: usersToKeep,
  });
  alert('User ' + user.username + ' has been deleted!');
};

export const deleteRecipe = (manage, recipe) => {
  const recipesToKeep = manage.state.recipes.filter((r) => {
    return r !== recipe;
  });
  manage.setState({
    recipes: recipesToKeep,
  });
  alert('Recipe ' + recipe.recipeName + ' has been deleted!');
};
