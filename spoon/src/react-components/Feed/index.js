import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as data from '../../api/data';

import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';

class Feed extends React.Component {
  state = {
    tabVal: 0,
    users: data.allUsers, // back-end call
    recipes: data.allRecipes.slice(0,9), //back-end call
    user: 'user1', //back-end call
    feed: []
  }

  handleTabs = (e, val) => {
    this.setState({
      tabVal: val
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
          style={{float: "left"}}
        >
          <Tab label="Feed" disableRipple />
          <Tab label="Discover" disableRipple />
        </Tabs>
      <div className="feed">
        <Header state={appState} />
        <TabPanel value={this.state.tabVal} index={0}>
          <p className="feed-message">See latest recipes from the chefs you are following!</p>
          {this.state.users.filter((u) =>  {
              return u.username === this.state.user
            })[0].feed.map((recipe_id) => {
              const recipe = this.state.recipes.filter((r) => {
                return r.recipeId === recipe_id
              });
              return (
                <Thumbnail
                  likes={recipe[0].likes}
                  recipename={recipe[0].recipeName}
                  username={recipe[0].owner}
                />
              );
            })}
        </TabPanel>
        <TabPanel value={this.state.tabVal} index={1}>
          <p className="feed-message">See the newest recipes posted onto Spoon!</p>
          {this.state.recipes.map((recipe) => {
              return (
                <Thumbnail
                  likes={recipe.likes}
                  recipename={recipe.recipeName}
                  username={recipe.owner}
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
  const {children, value, index} = props;
    return (
      <div>
        {
          value === index && (
            children
          )
        }
      </div>
    )
}

export default Feed;
