import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './styles.css';

// import Thumbnail from '../Thumbnail';
import Header from '../Header';

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <Header />
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
            >
              FOLLOW
            </Button>
          </div>
          <AppBar position="static" color="secondary">
            <Tabs>
              <Tab label="Recipes" />
              <Tab label="Likes" />
            </Tabs>
          </AppBar>
        </div>
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
      </div>
    );
  }
}

export default UserProfile;
