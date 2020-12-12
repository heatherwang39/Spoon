import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

import Header from '../Header';

class Unauthorized extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push('/Unauthorized');
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    console.log(this);
    console.log(this.props);
    this.timer = setTimeout(() => this.setState({ redirect: true }), 3000);
  }

  render() {
    const { app } = this.props;
    console.log(app);
    return this.state.redirect ? (
      <Redirect to="/Feed" />
    ) : (
      <div>
        <Header
          state={{ username: app.state.username, userMode: app.state.userMode }}
        />
        <Typography color="secondary">
          Oops you are unauthorized to browse this page.
        </Typography>
        <Typography color="primary">
          Will go to the Feed page after 3 seconds.
        </Typography>
      </div>
    );
  }
}

export default Unauthorized;
