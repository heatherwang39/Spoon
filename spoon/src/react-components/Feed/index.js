import React from 'react';

import './styles.css';

import Thumbnail from '../Thumbnail';

class Feed extends React.Component {
  render() {
    return (
      <div className="feed">
        <p>Feed</p>
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </div>
    );
  }
}

export default Feed;
