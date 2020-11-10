import React from 'react';
import Typography from '@material-ui/core/Typography';

import './styles.css';
import * as data from '../../api/data';

import Header from '../Header';
import SearchBar from '../SearchBar';
import UserInfo from './UserInfo';

class ManageUsers extends React.Component {
  state = {
    searchedName: '',
    users: data.allUsers, //this should be back-end call in phase 2
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value.toLowerCase();
    this.setState({
      searchedName: value,
    });
  };

  searchUser = () => {
    console.log(this.state.searchedName);
  };

  render() {
    return (
      <div>
        <Header state={this.props.appState} />
        <Typography variant="h2" color="secondary" gutterBottom>
          Manage Users
        </Typography>
        <SearchBar
          searchedKeyword={this.state.searchedName}
          handleInputChange={this.handleInputChange}
          searchObject={this.searchUser}
          placeholder="For example: Heather"
          label="User Name"
        />
        <UserInfo
          users={this.state.users}
          searchedName={this.state.searchedName}
          callerComponent={this}
          userMode={this.props.appState.userMode}
        />
      </div>
    );
  }
}

export default ManageUsers;
