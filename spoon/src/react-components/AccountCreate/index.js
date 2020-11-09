import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Header from '../Header';

class AccountCreate extends React.Component {
  state = {
    message: "",
    header: (<Header state={this.props.appState} />)
  }
  success = () => {
    // const newProps = {username: "user1", userType: "user"}
    // const newHeader = {...this.state.header, [this.props]:newProps}
    // this.setState({
    //   header: newHeader 
    // })
    this.setState({message:
      "You have successfully signed up for an account!"}
    )
  }

  render() {
    return (
      <div>
        {this.state.header}
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={5}>
            <TextField
              //   value={searchedKeyword}
              //   onChange={handleInputChange}
              type="text"
              name=""
              placeholder="e.g. user1"
              label="username"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              //   value={searchedKeyword}
              //   onChange={handleInputChange}
              type="text"
              name=""
              placeholder="e.g. user1"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={this.success}
              variant="outlined"
              color="secondary"
              size="large"
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
