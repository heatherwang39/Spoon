import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Feed from './react-components/Feed';
import UserProfile from './react-components/UserProfile';
import ManageUsers from './react-components/ManageUsers';
import ManageRecipes from './react-components/ManageRecipes';
import Search from './react-components/Search';
import RecipeCreate from './react-components/RecipeCreate';
import AccountCreate from './react-components/AccountCreate';

class App extends React.Component {
  state = {
    userMode: 'user',
    username: 'user1',
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {/* Similar to a switch statement - shows the component depending on the URL path */}
            {/* Each Route below shows a different component depending on the exact path in the URL  */}
            <Route
              exact
              path="/"
              render={() => <Feed appState={this.state} />}
            />
            <Route
              exact
              path="/Feed"
              render={() => <Feed appState={this.state} />}
            />
            <Route 
              exact
              path='/UserProfile/:id'
              render={() => <UserProfile appState={this.state} />}
            />
            <Route
              exact
              path="/ManageUsers"
              render={() => <ManageUsers appState={this.state} />}
            />
            <Route
              exact
              path="/ManageRecipes"
              render={() => <ManageRecipes appState={this.state} />}
            />
            <Route
              exact
              path="/Search"
              render={() => <Search appState={this.state} />}
            />
            <Route
              exact
              path="/RecipeCreate"
              render={() => <RecipeCreate appState={this.state} />}
            />
            <Route
              exact
              path="/AccountCreate"
              render={() => <AccountCreate appState={this.state} />}
            />
            {/* <Route
              exact
              path="/LogOut"
              render={() => <LogOut appState={this.state} />}
            /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
