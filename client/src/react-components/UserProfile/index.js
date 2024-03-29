import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { uid } from 'react-uid';
import { setUserProfile, checkFollow, addToUser, getCurrentUser } from './../../actions/users.js';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';
import { withRouter } from 'react-router-dom';

class UserProfile extends React.Component {
  componentDidMount() {
    const pathname = this.props.location.pathname;
    const userId = pathname.slice(pathname.lastIndexOf('/') + 1);
    setUserProfile(this, userId, this.props.appState.username)
    if (this.props.appState.userMode !== 'guest') {
      getCurrentUser(this)
      checkFollow(this, userId)
    }
  }

  state = {
    tabVal: 0,
    own: false, // Whether or not this is the user's own page
    loggedUser: {}, // currently logged in user
    userId: '', // user id of profile user
    username: '', // username of profile user
    follow: false, // Whether or not the logged in user is following this user
    followers: [],
    numFollowers: '0',
    color: 'secondary', // color of follow button
    recipes: [],
    liked: [],
    editOpen: false, // Whether or not the edit recipe popup is open
    recipeToEdit: {},
    og_tags: {
      // back-end call (?)
      Breakfast: false,
      Lunch: false,
      Dinner: false,
      Dessert: false,
      Vegan: false,
      NutFree: false,
    },
    openWarning: false,
  };

  closeWarning = () => {
    this.setState({ openWarning: false });
  };
  
  handleTabs = (e, val) => {
    this.setState({
      tabVal: val,
    });
  };

  handleFollow = (e) => {
    if (!this.state.follow) {
      // add logged user to followers of user profile
      this.state.followers.push(this.state.loggedUser._id)
      addToUser(this.state.userId, [{'path': '/followers', 'value': this.state.followers}])

      // add user profile to following of logged user
      this.state.loggedUser.following.push(this.state.userId)
      addToUser(this.state.loggedUser._id, [{'path': '/following', 'value': this.state.loggedUser.following}])

      // change state of follow related variables
      const followers = this.state.numFollowers + 1;
      this.setState({
        follow: true,
        numFollowers: followers,
        color: 'default',
      });
    } else {
      // remove logged user from followers of user profile
      const index1 = this.state.followers.indexOf(this.state.loggedUser._id)
      if (index1 !== -1) {
        this.state.followers.splice(index1, 1)
      }
      addToUser(this.state.userId, [{'path': '/followers', 'value': this.state.followers}])

      // remove user profile from following of logged user
      const index2 = this.state.loggedUser.following.indexOf(this.state.userId)
      if (index2 !== -1) {
        this.state.loggedUser.following.splice(index2, 1)
      }
      addToUser(this.state.loggedUser._id, [{'path': '/following', 'value': this.state.loggedUser.following}])

      // change state of follow related variables
      const followers = this.state.numFollowers - 1;
      this.setState({
        follow: false,
        numFollowers: followers,
        color: 'secondary',
      });
    }
  };

  render() {
    return (
      <div>
        <Header state={this.props.appState} />
        <div className="userprofile-profile">
          <div>
            <Typography
              className="userprofile-username"
              variant="h2"
              color="secondary"
              align="left"
            >
              {this.state.username}
            </Typography>
            <Typography
              className="userprofile-follower-count"
              variant="h5"
              color="secondary"
              align="left"
            >
              {this.state.numFollowers} followers
            </Typography>
            {!this.state.own && this.props.appState.userMode !== 'guest' && (
              <Button
                className="userprofile-button"
                variant="contained"
                color={this.state.color}
                onClick={this.handleFollow}
                disableRipple
                disableElevation
              >
                {!this.state.follow && 'FOLLOW'}
                {this.state.follow && 'UNFOLLOW'}
              </Button>
            )}
          </div>
          <div>
            <AppBar position="static" color="secondary">
              <Tabs value={this.state.tabVal} onChange={this.handleTabs}>
                <Tab label="Recipes" />
                <Tab label="Likes" />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.tabVal} index={0}>
              {this.state.recipes.map((recipe) => {
                  return (
                    <Thumbnail
                      userMode={this.props.appState.userMode}
                      recipeId={recipe}
                    />
                  );
                })}
            </TabPanel>
            <TabPanel value={this.state.tabVal} index={1}>
              {this.state.liked.map((recipe_id) => {
                  return (
                    <Thumbnail
                      userMode={this.props.appState.userMode}
                      recipeId={recipe_id}
                      key={uid(recipe_id)}
                    />
                  );
                })
              }
            </TabPanel>
          </div>
        </div>

        <Snackbar open={this.state.openWarning} autoHideDuration={6000} onClose={this.closeWarning}>
          <MuiAlert onClose={this.closeWarning} variant="filled" severity="error">
            Could not get all recipes!
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
}

export default withRouter(UserProfile);
