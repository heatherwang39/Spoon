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
    users: data.allUsers,
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value.toLowerCase();
    console.log(value);
    this.setState({
      searchedName: value,
    });
  };

  searchUser = () => {
    console.log(this.state.searchedName);
  };

  deleteUser = (user) => {
    const usersToKeep = this.state.users.filter((u) => {
      return u !== user;
    });
    this.setState({
      users: usersToKeep,
    });
    alert('User ' + user.username + ' has been deleted!');
  };

  render() {
    return (
      <div>
        <Header userMode={this.props.appState.userMode} />
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
          deleteUser={this.deleteUser}
        />
      </div>
    );
  }
}

export default ManageUsers;
