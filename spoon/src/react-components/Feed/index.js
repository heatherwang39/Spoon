import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as data from '../../api/data';

import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';
import { uid } from 'react-uid';

class Feed extends React.Component {
  state = {
    tabVal: 0,
    users: data.allUsers, // back-end call
    recipes: data.allRecipes.slice(0, 9), //back-end call
    user: this.props.appState.username, //back-end call
    feed: [],
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
          value={this.state.tabVal}
          onChange={this.handleTabs}
          orientation="vertical"
          textColor="secondary"
          style={{ float: 'left' }}
        >
          <Tab label="Feed" disableRipple/>
          <Tab label="Discover" disableRipple/>
        </Tabs>
      <div className="feed">
        <Header state={appState} />
        <TabPanel value={this.state.tabVal} index={0}>
          <p className="feed-message">
            See latest recipes from the chefs you are following!
          </p>
          {this.state.users.filter((u) =>  {
              return u.username === this.state.user
            })[0].feed.map((recipe_id) => {
              const recipe = this.state.recipes.filter((r) => {
                return r.recipeId === recipe_id
              });
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
            })}
        </TabPanel>
        <TabPanel value={this.state.tabVal} index={1}>
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
                  recipePhoto={recipe.recipePhoto}
                  likes={recipe.likes}
                  key={uid(recipe)}
                />
              );
            })}
          </TabPanel>
        </div>
      </div>
    );
  }
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
}

export default Feed;
