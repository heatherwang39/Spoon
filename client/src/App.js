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
import Unauthorized from './react-components/Unauthorized';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', //will be changed to '' later after each page implement back-end calls
      userMode: 'guest', //'admin','user'
      userId: '',
      checkSessionIsFinished: false,
    };

    //check the user is logged in and check the userMode,if the user already logged in, the state will be
    //set to the current user's username and userMode('user' or 'admin')
    //If the user hasn't logged in, the userMode will be 'guest'
    checkSession(this);
  }

  render() {
    console.log(this.state);
    return this.state.checkSessionIsFinished ? (
      <div>
        <BrowserRouter>
          <Switch>
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
              render={(props) => (
                <div>
                  {this.state.userMode !== 'admin' ? (
                    <Unauthorized {...props} app={this} />
                  ) : (
                    <ManageUsers appState={this.state} />
                  )}
                </div>
              )}
            />

            <Route
              exact
              path="/ManageRecipes"
              render={(props) => (
                <div>
                  {this.state.userMode !== 'admin' ? (
                    <Unauthorized {...props} app={this} />
                  ) : (
                    <ManageRecipes appState={this.state} />
                  )}
                </div>
              )}
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
              render={(props) => (
                <div>
                  {this.state.userMode !== 'guest' ? (
                    <Feed {...props} appState={this.state} />
                  ) : (
                    <AccountCreate {...props} app={this} />
                  )}
                </div>
              )}
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
            <Route
              exact
              path="/Unauthorized"
              render={(props) => <Unauthorized {...props} app={this} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default App;
