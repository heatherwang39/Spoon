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
          <Header state={appState}/>
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
              })
              .map((u) => {
                return u.feed.map((recipe_id) => {
                  return <Thumbnail userMode={this.props.appState.userMode} recipeId={recipe_id} />;
                });
              })
            }
          </TabPanel>
          <TabPanel
            value={this.state.tabVal}
            index={this.state.userMode !== 'guest' ? 1 : 0}
          >
            <p className="feed-message">
              See the newest recipes posted onto Spoon!
            </p>
            {this.state.recipes.map((recipe) => {
              return <Thumbnail userMode={this.props.appState.userMode} recipeId={recipe._id} />;
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
