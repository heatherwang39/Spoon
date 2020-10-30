import React from 'react';

import './styles.css';
import Header from '../Header';
import SearchBar from '../SearchBar';
import UserInfo from './UserInfo';

class ManageUsers extends React.Component {
  state = {
    searchedName: '',
    users: [
      { name: 'Heather', followers: '5' },
      { name: 'Joyce', followers: '6' },
      { name: 'Yuhan', followers: '7' },
      { name: 'Elsa', followers: '8' },
      { name: 'Jon', followers: '5' },
      { name: 'Aya', followers: '6' },
      { name: 'James', followers: '7' },
      { name: 'Tyrion', followers: '8' },
      { name: 'Penny', followers: '5' },
      { name: 'Leonard', followers: '6' },
      { name: 'Sheldon', followers: '7' },
      { name: 'Raj', followers: '8' },
    ],
    searchedUser: [],
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
    alert('User ' + user.name + ' has been deleted!');
  };

  render() {
    return (
      <div>
        <Header />
        <SearchBar
          searchedName={this.state.searchedName}
          handleInputChange={this.handleInputChange}
          searchUser={this.searchUser}
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
