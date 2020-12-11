import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import { checkSession } from './actions/user';

import Feed from './react-components/Feed';
import UserProfile from './react-components/UserProfile';
import ManageUsers from './react-components/ManageUsers';
import ManageRecipes from './react-components/ManageRecipes';
import Search from './react-components/Search';
import RecipeCreate from './react-components/RecipeCreate';
import AccountCreate from './react-components/AccountCreate';
import SignIn from './react-components/SignIn';
import LogOut from './react-components/LogOut';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   //check the user is logged in and check the userMode,if the user already logged in, the state will be
  //   //set to the current user's username and userMode('user' or 'admin')
  //   checkSession(this);
  // }
  componentDidMount() {
    //check the user is logged in and check the userMode,if the user already logged in, the state will be
    //set to the current user's username and userMode('user' or 'admin')
    checkSession(this);
  }

  state = {
    username: 'user1', //will be changed to '' later after each page implement back-end calls
    userMode: 'admin', //'admin','user'
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
              path={['/', '/Feed']}
              render={(props) => <Feed {...props} appState={this.state} />}
            />
            <Route
              exact
              path="/UserProfile/:id"
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
            <Route
              exact
              path="/SignIn"
              render={(props) => (
                <div>
                  {this.state.userMode !== 'guest' ? (
                    <Feed {...props} appState={this.state} />
                  ) : (
                    <SignIn {...props} app={this} />
                  )}
                </div>
              )}
            />
            <Route exact path="/LogOut" render={() => <LogOut app={this} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
