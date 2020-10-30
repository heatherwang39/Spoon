import React from 'react';

import './styles.css';

import Thumbnail from '../Thumbnail';
import Header from '../Header';

// const faker = require('faker');

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
