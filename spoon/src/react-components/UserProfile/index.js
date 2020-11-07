import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';

class UserProfile extends React.Component {

  state = {
    tabVal: 0
  }

  handleTabs = (e, val) => {
    this.setState({
      tabVal: val
    });
  };

  render() {
    return (
      <div>
        <Header userMode={this.props.appState.userMode} />
        <div className="userprofile-profile">
          <div>
            <Typography
              className="userprofile-username"
              variant="h2"
              color="secondary"
              align="left"
            >
              xXfire_dragonXx
            </Typography>
            <Typography
              className="userprofile-follower-count"
              variant="h5"
              color="secondary"
              align="left"
            >
              420 followers
            </Typography>
            <Button
              className="userprofile-button"
              variant="contained"
              color="secondary"
              // onClick={this.handleFollow}
            >
              FOLLOW
            </Button>
          </div>
          <div>
            <AppBar position="static" color="secondary">
              <Tabs value={this.state.tabVal} onChange={this.handleTabs}>
                <Tab label="Recipes" />
                <Tab label="Likes" />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.tabVal} index={0}>
              <div className="tabcontent">
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
              </div>
            </TabPanel>
            <TabPanel value={this.state.tabVal} index={1}>
              <div className="tabcontent">
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    );
  }
}

function TabPanel(props) {
  const {children, value, index} = props;
    return (
      <div>
        {
          value === index && (
            children
          )
        }
      </div>
    )
}

export default UserProfile;
