import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Header from '../Header';

class AccountCreate extends React.Component {
  state = {
    message: "",
    username: "",
    password: "",
    header: (<Header state={this.props.appState} />)
  }
  
  componentDidMount(){
    const newState = {username: "guest", userMode: "guest"}
    this.setState({
      header: (<Header state={newState} />)
    })
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  check = () => {
    if (this.state.password === "" || this.state.username === ""){
      this.setState({message:
        "Please enter a username and password."}
      )
    }
    else {
      this.success()
    }
  }

  success = () => {
    const newState = {username: "user1", userMode: "user"}
    this.setState({
      header: (<Header state={newState} />)
    })
    this.setState({message:
      "You have successfully signed up for an account!"}
    )
    this.setState({
      username: "",
      password: ""
    })
  }

  render() {
    return (
      <div>
        {this.state.header}
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={5}>
            <TextField
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              placeholder="e.g. user"
              label="Username"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="e.g. user"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={this.check}
              variant="outlined"
              color="secondary"
              size="large"
              disableRipple
            >
              Sign Up
            </Button>
            </Grid>

          <Grid item xs={12}>
            <Typography>{this.state.message}</Typography>
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default AccountCreate;
