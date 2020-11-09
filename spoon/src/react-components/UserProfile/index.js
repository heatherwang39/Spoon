import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './styles.css';
import * as data from '../../api/data';

import Thumbnail from '../Thumbnail';
import Header from '../Header';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';

class UserProfile extends React.Component {
  state = {
    tabVal: 0,
    username: 'User1',
    follow: false,
    followers: 420,
    color: 'secondary',
    recipes: data.allRecipes,
    editOpen: false, // Whether or not the edit recipe popup is open
    recipeToEdit: '',
  };

  editRecipe = (recipe) => {
    this.setState({
      editOpen: true,
      recipeToEdit: recipe,
    });
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
        <Header userMode={this.props.appState.userMode} />
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
          </div>
          <div>
            <AppBar position="static" color="secondary">
              <Tabs value={this.state.tabVal} onChange={this.handleTabs}>
                <Tab label="Recipes" />
                <Tab label="Likes" />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.tabVal} index={0}>
              <RecipeList
                recipes={this.state.recipes}
                editRecipe={this.editRecipe}
                deleteRecipe={this.deleteRecipe}
              />
            </TabPanel>
            <TabPanel value={this.state.tabVal} index={1}>
              <Thumbnail />
              <Thumbnail />
              <Thumbnail />
              <Thumbnail />
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
          tags={this.state.recipeToEdit.tags}
          recipePhoto={this.state.recipeToEdit.recipePhoto}
          open={editOpen}
          closePopup={this.closePopup}
        />
      </div>
    );
  }
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
}

export default UserProfile;
