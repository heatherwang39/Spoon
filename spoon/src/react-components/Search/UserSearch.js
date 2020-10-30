import React from 'react';
import './styles.css';
import SearchBar from '../SearchBar';
import Header from '../Header';

class UserSearch extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <SearchBar
          //   searchedName={this.state.searchedUser}
          //   handleInputChange={this.searchUser}
          placeholder="For example: Heather"
          label="Search User"
        />
      </div>
    );
  }
}

export default UserSearch;
