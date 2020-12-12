import React from 'react';
import './styles.css';
import SearchBar from '../SearchBar';
import UserInfo from '../ManageUsers/UserInfo';
import { getAllUsers } from '../../actions/users';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class UserSearch extends React.Component {
  state = {
    currInput: '',
    searchedName: null,
    users: [],
    alertMessage: '',
    openAlert: false,
  };

  componentDidMount() {
    //get users
    getAllUsers(this);
  }

  closeAlert = () => {
    this.setState({ openAlert: false });
  };

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
    const { userMode } = this.props;
    return (
      <div>
        <SearchBar
          searchedKeyword={this.state.currInput}
          handleInputChange={this.handleInputChange}
          searchObject={this.searchUser}
          placeholder="For example: Heather"
          label="Search User"
        />
        <Snackbar
          open={this.state.openAlert}
          autoHideDuration={6000}
          onClose={this.closeAlert}
        >
          <MuiAlert onClose={this.closeAlert} variant="filled" severity="error">
            {this.state.alertMessage}
          </MuiAlert>
        </Snackbar>

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
