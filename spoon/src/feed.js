import React from 'react';
// import { Link } from "react-router-dom";

import Thumbnail from './thumbnail';

class Feed extends React.Component {
  render() {
    return (
      <div>
        <p>Feed</p>
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </div>
    );
  }
}

export default Feed;
