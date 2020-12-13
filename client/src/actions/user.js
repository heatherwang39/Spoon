// Send a request to check if a user is logged in and check the userMode through the session cookie
export const checkSession = (app) => {
  const url = '/users/check-session';

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json) {
        app.setState({
          username: json.username,
          userMode: json.userMode,
          userId: json.userId,
          checkSessionIsFinished: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
  const value = field.value;
  const name = field.name;

  loginComp.setState({
    [name]: value,
  });
};

// A function to send a POST request with the user to be logged in
export const login = (comp, app) => {
  // Create our request constructor with all the parameters we need
  const request = new Request(`/users/login`, {
    method: 'post',
    body: JSON.stringify(comp.state),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } 
      else {
        comp.setState({message: "Username or password is incorrect!"})
      }
    })
    .then((json) => {
      if (json.username !== undefined) {
        app.setState({
          username: json.username,
          userMode: json.userMode,
          userId: json.userId,
        });
      } 
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to send a GET request to logout the current user
export const logout = (logoutComp, app) => {
  const url = `/users/logout`;

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      console.log(app);
      app.setState({
        username: 'user1', // will be set to '' after other page implemented the back end call
        userMode: 'guest',
        userId: '',
      });
      console.log(json);
      logoutComp.setState({
        usernameBeforeLogout: json.username,
      });
      console.log(logoutComp);
    })
    .catch((error) => {
      console.log(error);
    });
};

//A function to create a user and session
export const signup = (signupComp, app) => {
  console.log('state:', signupComp);

  const request = new Request('/api/users', {
    method: 'post',
    body: JSON.stringify(signupComp.state),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  fetch(request)
    .then((user) => {
      if (user.status === 200) {
        signupHelper(signupComp, app);
      } else {
        signupComp.setState({
          message: 'Something went wrong. You were unable to sign up.',
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signupHelper = (signupComp, app) => {
  // Create session with new account
  const sesRequest = new Request(`/users/login`, {
    method: 'post',
    body: JSON.stringify({
      username: signupComp.state.username,
      password: signupComp.state.password,
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  // Send the request with fetch()
  fetch(sesRequest)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      signupComp.setState({
        message:
          'You have successfully signed up. You will be redirected to your feed in 2 seconds!',
      });
      setTimeout(
        () =>
          app.setState({
            username: json.username,
            userMode: 'user', //newly created user is never admin
            userId: json.userId,
          }),
        2000
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
