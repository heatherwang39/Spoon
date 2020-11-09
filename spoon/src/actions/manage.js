// Methods in this file modifies the ManageUser and ManageRecipe component state

export const deleteUser = (manage, user) => {
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
