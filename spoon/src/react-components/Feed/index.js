import React from 'react';

import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';

class Feed extends React.Component {
  render() {
    return (
      <div className="feed">
        <Header />
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
