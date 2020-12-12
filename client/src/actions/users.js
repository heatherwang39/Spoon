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

// gets a specific user and sets UserProfile state values
export const setUserProfile = (component, id, loggedUser) => {
  const url = `/api/users/${id}`;
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
      component.setState({ 
        own: json.user.username === loggedUser,
        username: json.user.username, 
        followers: json.user.followers.length,
        recipes: json.user.recipes,
        liked: json.user.liked
       });
    })
    .catch((error) => {
      console.log(error);
    });
};

// check if the logged in user is following the user whose profile they are viewing
export const checkFollow = (component, id) => {
  const url = `/users/currentUser`;
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
    json.user.following.forEach((user) => {
      if (user._id === id) {
        component.setState({
          follow: true
        })
      }
    })
  })
  .catch((error) => {
    console.log(error);
  });
}

//add to user info (e.g. liked, recipes, following etc.)
export const addToUser = (userId, changes) => {
  //changes should be an array of {path, value} objects
  const url = '/api/users/' + userId;

  const send = {
    //id is user id
    method: 'PATCH',
    body: JSON.stringify(changes),
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json',
    }
  }

  console.log(send)
  const request = new Request(url, send);

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