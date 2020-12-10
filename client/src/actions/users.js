//API function calls for users collection

//get all users' info for search
export const getAllUsers = (component) => {
  const url = '/api/users';
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        console.log('Could not get users');
      }
    })
    .then((json) => {
      component.setState({ users: json });
    })
    .catch((error) => {
      console.log(error);
    });
};

//add to user info (e.g. liked, recipes, following etc.)
export const addToUser = (userId, changes) => {
  //changes should be an array of {path, value} objects
  const url = '/api/user/' + userId;
  const request = new Request(url, {
    //id is user id
    method: 'patch',
    body: changes,
  });

  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        // TODO: DON'T USE ALERTS
        alert('Could not update user!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
