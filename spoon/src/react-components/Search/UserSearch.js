import React from 'react';
import './styles.css';
import SearchBar from '../SearchBar';
import UserInfo from './UserInfo';

class UserSearch extends React.Component {
  state = {
    currInput: '',
    searchedName:
      null,
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
