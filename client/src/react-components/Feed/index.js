import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as data from '../../api/data';
import { allRecipes } from './../../actions/recipes';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';
import { uid } from 'react-uid';

class Feed extends React.Component {
  // componentDidMount() {
  //   allRecipes(this);
  // }

  constructor(props) {
    super(props);
    this.props.history.push('/Feed');
  }

  state = {
    tabVal: 0,
    users: data.allUsers, // back-end call
    recipes: data.allRecipes.slice(0, 9), //back-end call
    user: this.props.appState.username, //back-end call
    feed: [],
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
            {this.state.users
              .filter((u) => {
                return u.username === this.state.user;
              })[0]
              .feed.map((recipe_id) => {
                const recipe = this.state.recipes.filter((r) => {
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
                    // recipePhoto={recipe[0].recipePhoto}
                    // likes={recipe[0].likes}
                    recipeId={recipe_id}
                    key={uid(recipe[0])}
                  />
                );
              })}
          </TabPanel>
          <TabPanel
            value={this.state.tabVal}
            index={this.state.userMode !== 'guest' ? 1 : 0}
          >
            <p className="feed-message">
              See the newest recipes posted onto Spoon!
            </p>
            {this.state.recipes.map((recipe) => {
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
                  recipePhoto={recipe.recipePhoto.image_url}
                  likes={recipe.likes}
                  key={uid(recipe)}
                />
              );
            })}
          </TabPanel>
        </div>
        {/* <Snackbar open={this.state.openWarning} autoHideDuration={6000} onClose={this.closeWarning}>
          <MuiAlert onClose={this.closeWarning} variant="filled" severity="error">
            Could not get all recipes!
          </MuiAlert>
        </Snackbar> */}
      </div>
    );
  }
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
}

export default Feed;
