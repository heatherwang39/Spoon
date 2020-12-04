import React from 'react';
import './styles.css';
import SearchBar from '../SearchBar';
import UserInfo from '../ManageUsers/UserInfo';
import * as data from '../../api/data';

class UserSearch extends React.Component {
  state = {
    currInput: '',
    searchedName:
      null,
    users: []
  }

  componentDidMount(){
    //get users
    fetch('/users')
    .then((res) => { 
      if (res.status === 200) {
          // return a promise that resolves with the JSON body
          return res.json() 
      } else {
          alert('Could not get users')
      }                
    })
    .then((json) => {
      console.log(json)
      this.setState({users: json})
    })
    .catch((error) => {
      console.log(error)
    })
  } 

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value.toLowerCase();
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
    const {userMode} = this.props
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
          userMode={userMode}
          searchPage={true}
        />
      </div>
    );
  }
}

export default UserSearch;
