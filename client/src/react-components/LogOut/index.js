import React from 'react';
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
    logout(this, this.props.app);
  }

  render() {
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
