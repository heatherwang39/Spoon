import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import faker from 'faker';

import './styles.css';

class UserInfo extends React.Component {
  render() {
    const { users, searchedName, deleteUser } = this.props;
    return (
      <div className="infoArea">
        {users
          .filter((user) => {
            return user.name.toLowerCase().includes(searchedName);
          })
          .map((user) => {
            return (
              <Paper className="userListContainer">
                <Grid
                  className="userList"
                  container
                  spacing={2}
                  alignItems="center"
                >
                  <Grid item xs={2}>
                    <img
                      className="userAvatar"
                      alt="avatar"
                      src={faker.image.avatar()}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" color="secondary" align="left">
                      {user.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" color="primary" align="left">
                      Followers: {user.followers}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      onClick={() => deleteUser(user)}
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
      </div>
    );
  }
}

export default UserInfo;
