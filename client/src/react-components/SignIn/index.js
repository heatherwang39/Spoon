import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Header from '../Header';
import { updateLoginForm, login } from '../../actions/user';

import './styles.css';

class SignIn extends React.Component {

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
        <Typography variant="h2" color="secondary" gutterBottom>
          Sign In
        </Typography>
        <Grid
          container
          className="signInContainer"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={8}>
            <TextField
              onChange={(e) => updateLoginForm(this, e.target)}
              type="text"
              name="username"
              placeholder="e.g. user"
              label="Username"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              onChange={(e) => updateLoginForm(this, e.target)}
              name="password"
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
            </Button>
          </Grid>
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
        </Grid>
      </div>
    );
  }
}

export default SignIn;
