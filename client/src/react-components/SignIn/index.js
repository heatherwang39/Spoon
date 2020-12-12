import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Header from '../Header';
import { updateLoginForm, login } from '../../actions/user';
// this is both the sign in page and the page you get taken to when you log out
class SignIn extends React.Component {
  // state = {
  //   message: '',
  //   password: '',
  //   username: '',
  //   // header: <Header state={this.props.appState} />,
  //   successFlag: false,
  // };

  // componentDidMount() {
  //   const newState = { username: 'guest', userMode: 'guest' };
  //   this.setState({
  //     header: <Header state={newState} />,
  //   });
  // }

  // handleInputChange = (event) => {
  //   const name = event.target.name;
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  // check = () => {
  //   if (
  //     (this.state.username === 'user' && this.state.password === 'user') ||
  //     (this.state.username === 'admin' && this.state.password === 'admin')
  //   ) {
  //     this.success();
  //   } else {
  //     this.setState({ message: 'You have entered incorrect credentials.' });
  //   }
  //   this.setState({
  //     username: '',
  //     password: '',
  //   });
  // };

  // success = () => {
  //   const newState = {
  //     username: this.state.username,
  //     userMode: this.state.username,
  //   };
  //   this.setState({
  //     header: <Header state={newState} />,
  //   });
  //   this.setState({ message: 'You have successfully signed in!' });
  // };

  constructor(props) {
    super(props);
    this.props.history.push('/SignIn');
  }

  state = {
    username: '',
    password: '',
    alertMessage: '',
    openAlert: false,
  };

  closeAlert = () => {
    this.setState({ openAlert: false });
  };

  render() {
    const { app } = this.props;
    return (
      <div>
        {/* {this.state.successFlag ? (
          <Header
            state={{
              username: this.state.username,
              userMode: this.state.userMode,
            }}
          />
        ) : (
          <Header state={{ username: 'guest', userMode: 'guest' }} />
        )} */}
        {app.state.userMode !== 'guest' ? (
          <Header
            state={{
              username: app.state.username,
              userMode: app.state.userMode,
            }}
          />
        ) : (
          <Header state={{ username: 'guest', userMode: 'guest' }} />
        )}
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={5}>
            <TextField
              // value={this.state.username}
              // onChange={this.handleInputChange}
              onChange={(e) => updateLoginForm(this, e.target)}
              type="text"
              name="username"
              placeholder="e.g. user"
              label="Username"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              // value={this.state.password}
              // onChange={this.handleInputChange}
              onChange={(e) => updateLoginForm(this, e.target)}
              name="password"
              placeholder="e.g. user"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              // onClick={this.check}
              onClick={() => login(this, app)}
              variant="outlined"
              color="secondary"
              size="large"
              disableRipple
            >
              Sign In
              {/* Here is where we would 
                validate the user's login, 
                and retrieve their account 
                information from the backend. */}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Snackbar
              open={this.state.openAlert}
              autoHideDuration={6000}
              onClose={this.closeAlert}
            >
              <MuiAlert
                onClose={this.closeAlert}
                variant="filled"
                severity="error"
              >
                {this.state.alertMessage}
              </MuiAlert>
            </Snackbar>

            {app.state.userMode !== 'guest'
              ? this.setState({
                  alertMessage: 'You have successfully logged in!',
                })
              : this.setState({
                  alertMessage: 'Please enter the correct credentials',
                })
            }
            
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SignIn;
