import React from 'react';
import Typography from '@material-ui/core/Typography';

import './styles.css';
import { getAllUsers, updateSearchUserForm } from '../../actions/manage';

import Header from '../Header';
import SearchBar from '../SearchBar';
import UserInfo from './UserInfo';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedName: '',
      users: [],
      alertMessage: '',
      openAlert: false,
    };
  }

  componentDidMount() {
    getAllUsers(this);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value.toLowerCase();
    this.setState({
      searchedName: value,
    });
  };

  searchUser = () => {
    console.log('You are searching for: ' + this.state.searchedName);
  };

  closeAlert = () => {
    this.setState({ openAlert: false });
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
          handleInputChange={(e) => updateSearchUserForm(this, e.target)}
          searchObject={this.searchUser}
          placeholder="For example: Heather"
          label="User Name"
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
          callerComponent={this}
          userMode={this.props.appState.userMode}
        />
      </div>
    );
  }
}

export default ManageUsers;
