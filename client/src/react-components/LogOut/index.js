import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import { logout } from '../../actions/user';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBeforeLogout: '',
      redirect: false,
    };
  }

  componentDidMount() {
    logout(this, this.props.app);
    this.helper = setTimeout(() => this.setState({ redirect: true }), 2000);
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/Feed" />
    ) : (
      <div>
        <Header state={{ username: 'guest', userMode: 'guest' }} />
        <Typography color="secondary">
          Good bye, {this.state.usernameBeforeLogout}!
        </Typography>
        <Typography color="primary">
          Will go to the Feed page after 2 seconds.
        </Typography>
      </div>
    );
  }
}

export default LogOut;
