import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Header from '../Header';
import { logout } from '../../actions/user';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBeforeLogout: '',
    };
  }

  componentDidMount() {
    console.log(this);
    console.log(this.props.appState);
    this.userLogOut = () => logout(this, this.props.appState);
  }

  render() {
    const { app } = this.props.appState;

    // this.setState({ usernameBeforeLogout: this.props.appState.state.username });

    return (
      <div>
        <Header state={{ username: 'guest', userMode: 'guest' }} />
        <Typography color="secondary">
          Good bye, {this.state.usernameBeforeLogout}!
        </Typography>
      </div>
    );
  }
}

export default LogOut;
