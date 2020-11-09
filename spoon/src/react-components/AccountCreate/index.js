import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Header from '../Header';

class AccountCreate extends React.Component {
  render() {
    return (
      <div>
        <Header state={this.props.appState} />
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={5}>
            <TextField
              //   value={searchedKeyword}
              //   onChange={handleInputChange}
              type="text"
              name=""
              placeholder="joyce@email.com"
              label="Email"
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
              placeholder=""
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
            //   onClick={}
              variant="contained"
              color="secondary"
              size="large"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AccountCreate;
