import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { uid } from 'react-uid';
import { allRecipes } from './../../actions/recipes';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import './styles.css';
import * as data from '../../api/data';

import Thumbnail from '../Thumbnail';
import Header from '../Header';
import RecipeEdit from './RecipeEdit';
import { withRouter } from 'react-router-dom';

class UserProfile extends React.Component {
  componentDidMount() {
    allRecipes(this);
    const pathname = this.props.location.pathname;
    const username = pathname.slice(pathname.lastIndexOf('/') + 1);
    const own = this.props.appState.username === username;
    const user = this.state.users.filter((u) => {
      return u.username === username;
    });
    const followers = user[0].followers.length;
    this.setState({ username: username, own: own, followers: followers });
  }

  state = {
    tabVal: 0,
    own: false, // Whether or not this is the user's own page
    username: 'user1', // back-end call
    follow: false, // back-end call
    followers: '2', // back-end call
    color: 'secondary',
    recipes: [],
    users: data.allUsers, // back-end call
    editOpen: false, // Whether or not the edit recipe popup is open
    recipeToEdit: '',
    og_tags: {
      // back-end call
      Breakfast: false,
      Lunch: false,
      Dinner: false,
      Dessert: false,
      Vegan: false,
      NutFree: false,
    },
    openWarning: true,
  };

  closeWarning = () => {
    this.setState({ openWarning: false });
  };

  editRecipe = (recipe) => {
    this.setState(
      {
        editOpen: true,
        recipeToEdit: recipe,
      },
      function () {
        let tags = this.state.recipeToEdit.tags;
        let new_tags = [];
        if (tags) {
          tags.map((tag) => new_tags.push(tag.toString()));
        }
        if (new_tags) {
          const og_tags = this.state.og_tags;
          for (let i = 0; i < new_tags.length; i++) {
            console.log(new_tags[i]);
            og_tags[new_tags[i]] = true;
          }
          this.setState({
            og_tags: og_tags,
          });
        }
      }
    );
  };

  closePopup = () => {
    this.setState({ editOpen: false });
  };

  deleteRecipe = (recipe) => {
    const recipesToKeep = this.state.recipes.filter((r) => {
      return r !== recipe;
    });
    this.setState({
      recipes: recipesToKeep,
    });
    alert('Recipe ' + recipe.recipeName + ' has been deleted!');
  };

  handleTabs = (e, val) => {
    this.setState({
      tabVal: val,
    });
  };

  handleFollow = (e) => {
    if (!this.state.follow) {
      const followers = this.state.followers + 1;
      this.setState({
        follow: true,
        followers: followers,
        color: 'default',
      });
    } else {
      const followers = this.state.followers - 1;
      this.setState({
        follow: false,
        followers: followers,
        color: 'secondary',
      });
    }
  };

  render() {
    const { editOpen } = this.state;
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
              {this.state.followers} followers
            </Typography>
            {!this.state.own && (
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
              {this.state.recipes
                .filter((r) => {
                  return r.owner === this.state.username;
                })
                .map((recipe) => {
                  return (
                    <Thumbnail
                      recipeName={recipe.recipeName}
                      owner={recipe.owner}
                      ingredients={recipe.ingredients}
                      instructions={recipe.instructions}
                      servingSize={recipe.servingSize}
                      cookTimeHrs={recipe.cookTimeHrs}
                      cookTimeMins={recipe.cookTimeMins}
                      tags={recipe.tags}
                      recipePhoto={recipe.recipePhoto}
                      likes={recipe.likes}
                      own={this.state.own}
                      editRecipe={() => this.editRecipe(recipe)}
                      deleteRecipe={() => this.deleteRecipe(recipe)}
                      key={uid(recipe)}
                    />
                  );
                })}
            </TabPanel>
            <TabPanel value={this.state.tabVal} index={1}>
              {this.state.users
                .filter((u) => {
                  return u.username === this.state.username;
                })[0]
                .liked.map((recipe_id) => {
                  const recipe = this.state.recipes.filter((r) => {
                    return r.recipeId === recipe_id;
                  });
                  if (recipe[0] != null) {
                    return (
                      <Thumbnail
                        recipeName={recipe[0].recipeName}
                        owner={recipe[0].owner}
                        ingredients={recipe[0].ingredients}
                        instructions={recipe[0].instructions}
                        servingSize={recipe[0].servingSize}
                        cookTimeHrs={recipe[0].cookTimeHrs}
                        cookTimeMins={recipe[0].cookTimeMins}
                        tags={recipe[0].tags}
                        recipePhoto={recipe[0].recipePhoto}
                        likes={recipe[0].likes}
                        key={uid(recipe[0])}
                      />
                    );
                  } else {
                    return <div></div>;
                  }
                })}
            </TabPanel>
          </div>
        </div>
        <RecipeEdit
          recipeName={this.state.recipeToEdit.recipeName}
          owner={this.state.recipeToEdit.owner}
          ingredients={this.state.recipeToEdit.ingredients}
          instructions={this.state.recipeToEdit.instructions}
          servingSize={this.state.recipeToEdit.servingSize}
          cookTimeHrs={this.state.recipeToEdit.cookTimeHrs}
          cookTimeMins={this.state.recipeToEdit.cookTimeMins}
          tags={this.state.og_tags}
          recipePhoto={this.state.recipeToEdit.recipePhoto}
          open={editOpen}
          closePopup={this.closePopup}
        />
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
