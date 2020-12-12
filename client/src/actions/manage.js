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

export const deleteUser = async (manageComp, userId) => {
  // Create our request constructor with all the parameters we need
  const request = new Request(`/api/users/${userId}`, {
    method: 'delete',
  });
  const url = '/api/users';
  // delete the user
  try {
    const res = await fetch(request);
    if (res.status === 200) {
      console.log('delete the user successfully.');
    }
    const resGet = await fetch(url);
    const json = await resGet.json();
    manageComp.setState({
      users: json,
    });
    console.log('reset manageCome');
    console.log(manageComp);
  } catch (error) {
    console.log(error);
  }
};
