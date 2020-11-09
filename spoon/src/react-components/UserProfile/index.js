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
import {withRouter} from 'react-router-dom';

class UserProfile extends React.Component {
  state = {
    tabVal: 0,
    own: false, // Whether or not this is the user's own page
    username: 'user1', 
    follow: false,
    followers: 420,
    color: 'secondary',
    recipes: data.allRecipes,
    users: data.allUsers,
    editOpen: false, // Whether or not the edit recipe popup is open
    recipeToEdit: '',
  };
  componentDidMount(){
    const pathname = this.props.location.pathname;
    this.setState({username: pathname.slice(pathname.lastIndexOf("/")+1)})
    console.log("username", this.state.username)
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
    // this.setState({username: useLocation()})
    // const { username } = this.props.location.state;
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
            {!this.state.own && <Button
              className="userprofile-button"
              variant="contained"
              color={this.state.color}
              onClick={this.handleFollow}
              disableRipple
              disableElevation
            >
              {!this.state.follow && 'FOLLOW'}
              {this.state.follow && 'UNFOLLOW'}
            </Button>}
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
                recipes={this.state.recipes.filter((r) => {
                  return r.owner === this.state.username;
                })}
                editRecipe={this.editRecipe}
                deleteRecipe={this.deleteRecipe}
              />
            </TabPanel>
            <TabPanel value={this.state.tabVal} index={1}>
              {this.state.users.filter((u) => {
                return u.username === this.state.username;
              })[0].liked.map((recipe_id) => {
                const recipe = this.state.recipes.filter((r) => {
                  return r.recipeId === recipe_id
                });
                if (recipe[0] != null) {
                  return (
                    <Thumbnail
                      likes={recipe[0].likes}
                      recipename={recipe[0].recipeName}
                      username={recipe[0].owner}
                    />
                  )
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

export default withRouter( UserProfile);
