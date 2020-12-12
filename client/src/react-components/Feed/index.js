import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { allRecipes } from './../../actions/recipes';
import { getAllUsers } from '../../actions/users';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';
import Button from '@material-ui/core/Button';
import { uid } from 'react-uid';

class Feed extends React.Component {
  componentDidMount() {
    allRecipes(this);
    getAllUsers(this);
  }

  constructor(props) {
    super(props);
    this.props.history.push('/Feed');
  }

  state = {
    tabVal: 0,
    users: [],
    recipes: [],
    user: this.props.appState.username,
    userMode: this.props.appState.userMode,
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

<<<<<<< HEAD
  showFeed = () => {
    console.log('show feed')
    const user = this.state.users.filter((u) => {
      return u.username === this.state.user;
    })[0];
    if (user === 'undefined') {
      console.log('recipes undef (feed)')
      return;
    } else {
      
      user.feed.map((recipe_id) => {
        const recipe = this.state.recipes.filter((r) => {
          console.log(r)
          return r.recipeId === recipe_id;
        });
        return (
          <Thumbnail
            // recipeName={recipe[0].recipeName}
            // owner={recipe[0].owner}
            // ingredients={recipe[0].ingredients}
            // instructions={recipe[0].instructions}
            // servingSize={recipe[0].servingSize}
            // cookTimeHrs={recipe[0].cookTimeHrs}
            // cookTimeMins={recipe[0].cookTimeMins}
            // tags={recipe[0].tags}
            // recipePhoto={recipe[0].recipePhoto.image_url}
            // likes={recipe[0].likes}
            recipeId={recipe[0]._id}
            key={uid(recipe[0])}
          />
        );
      });
    }
  };

  showDiscover = () => {
    console.log('show discover')
    const recipes = this.state.recipes;
    if (recipes === 'undefined') {
      console.log('recipes undef (discover)')
      return;
    } else {
      
      this.state.recipes.map((recipe) => {
        console.log(recipe)
        return (
          <Thumbnail
            // recipeName={recipe.recipeName}
            // owner={recipe.owner}
            // ingredients={recipe.ingredients}
            // instructions={recipe.instructions}
            // servingSize={recipe.servingSize}
            // cookTimeHrs={recipe.cookTimeHrs}
            // cookTimeMins={recipe.cookTimeMins}
            // tags={recipe.tags}
            // recipePhoto={recipe.recipePhoto.image_url}
            // likes={recipe.likes}
            recipeId={recipe._id}
            key={uid(recipe)}
          />
        );
      });
    }
  };

=======
>>>>>>> c1584b8786a17531061e0db158a93bc74af558e5
  render() {
    // eslint-disable-next-line react/prop-types
    const { appState } = this.props;
    return (
      <div>
        <Tabs
          className="feed-side-bar"
          value={this.state.tabVal}
          onChange={this.handleTabs}
          orientation="vertical"
          textColor="secondary"
        >
          {this.state.userMode !== 'guest' ? (
            <Tab label="Feed" disableRipple />
          ) : null}
          <Tab label="Discover" disableRipple />
        </Tabs>
        <div className="feed">
          <Header state={appState} />
          <TabPanel
            value={this.state.tabVal}
            index={this.state.userMode !== 'guest' ? 0 : null}
          >
            <p className="feed-message">
              See latest recipes from the chefs you are following!
            </p>
<<<<<<< HEAD
            {/* {this.showDiscover} */}
=======
            {this.state.users
              .filter((u) => {
                return u.username === this.state.user;
              })
              .map((u) => {
                u.feed.map((recipe_id) => {
                  const recipe = this.state.recipes.filter((r) => {
                    return r.recipeId === recipe_id;
                  });
                  return <Thumbnail recipeId={recipe[0]._id} />;
                });
              })}
>>>>>>> c1584b8786a17531061e0db158a93bc74af558e5
          </TabPanel>
          <TabPanel
            value={this.state.tabVal}
            index={this.state.userMode !== 'guest' ? 1 : 0}
          >
            <p className="feed-message">
              See the newest recipes posted onto Spoon!
            </p>
<<<<<<< HEAD
            {/* {this.showFeed} */}
            {this.state.recipes.map((recipe) => {
              console.log(recipe)
              return (
                <Thumbnail
                  userMode={this.props.appState.userMode}
                  recipeId={recipe._id}
                  key={uid(recipe)}
                />
              );
=======
            {this.state.recipes.map((recipe) => {
              return <Thumbnail recipeId={recipe._id} />;
>>>>>>> c1584b8786a17531061e0db158a93bc74af558e5
            })}
          </TabPanel>
        </div>
        <Snackbar
          open={this.state.openWarning}
          autoHideDuration={6000}
          onClose={this.closeWarning}
        >
          <MuiAlert
            onClose={this.closeWarning}
            variant="filled"
            severity="error"
          >
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

export default Feed;
