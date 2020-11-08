import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';

class Feed extends React.Component {
  state = {
    tabVal: 0
  }

  handleTabs = (e, val) => {
    this.setState({
      tabVal: val
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { appState } = this.props;
    return (
      <div>
        <Tabs
          value={this.state.tabVal}
          onChange={this.handleTabs}
          orientation="vertical"
          textColor="secondary"
          style={{float: "left"}}
        >
          <Tab label="Feed" disableRipple />
          <Tab label="Discover" disableRipple />
        </Tabs>
      <div className="feed">
        <Header userMode={appState.userMode} />
        <TabPanel value={this.state.tabVal} index={0}>
          <p className="feed-message">See latest recipes from the chefs you are following!</p>
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
        </TabPanel>
        <TabPanel value={this.state.tabVal} index={1}>
          <p className="feed-message">See the newest recipes posted onto Spoon!</p>
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
        </TabPanel>
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

export default Feed;
