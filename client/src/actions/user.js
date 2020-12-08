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
      if (json && json.username) {
        app.setState({ username: json.username, userMode: json.userMode });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
