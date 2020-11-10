import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import faker from 'faker';
import { uid } from 'react-uid';

import { Link } from 'react-router-dom';

import './styles.css';
import { deleteUser } from '../../actions/manage';

class UserInfo extends React.Component {
  render() {
    const {
      users,
      searchedName,
      callerComponent,
      userMode,
      searchPage,
    } = this.props;
    return (
      <div className="infoArea">
        {users
          .filter((user) => {
            return user.username.toLowerCase().includes(searchedName);
          })
          .map((user) => {
            return (
              <Paper className="userListContainer" key={uid(user)}>
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
                    <Link
                      className="text-link"
                      to={`../UserProfile/${user.username}`}
                    >
                      <Typography variant="h6" color="secondary" align="left">
                        {user.username}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h6" color="primary" align="left">
                      Followers:
                      {user.followers.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {userMode === 'admin' && !searchPage ? (
                      <Button
                        onClick={() => deleteUser(callerComponent, user)}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        disableRipple
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button variant="contained" color="secondary">
                        <Link
                          className="user-info-link"
                          to={`../UserProfile/${user.username}`}
                        >
                          View profile
                        </Link>
                      </Button>
                    )}
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
