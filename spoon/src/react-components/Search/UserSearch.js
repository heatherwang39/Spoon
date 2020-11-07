import React from 'react';
import './styles.css';
import SearchBar from '../SearchBar';
import UserInfo from './UserInfo';
import * as data from '../../api/data';

class UserSearch extends React.Component {
  state = {
    currInput: '',
    searchedName:
      null,
    users: data.allUsers,
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value.toLowerCase();
    console.log('typing', value);
    this.setState({
      currInput: value,
    });
  };

  searchUser = (event) => {
    this.setState({
      searchedName: this.state.currInput,
    });
    console.log('search for', this.state.searchedName);
  };

  render() {
    return (
      <div>
        <SearchBar
          searchedKeyword={this.state.currInput}
          handleInputChange={this.handleInputChange}
          searchObject={this.searchUser}
          placeholder="For example: Heather"
          label="Search User"
        />
        <UserInfo
          users={this.state.users}
          searchedName={this.state.searchedName}
        />
      </div>
    );
  }
}

export default UserSearch;
