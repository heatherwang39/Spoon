import React from 'react';

import './styles.css';

class Thumbnail extends React.Component {
  render() {
    return (
      <div className="thumbnail">
        <div className="thumbnail-picture">
          <p>picture</p>
        </div>
        <div className="thumbnail-recipe-name">
          <p className="thumbnail-recipe-name">recipe name</p>
        </div>
        <div className="thumbnail-username">
          <p className="thumbnail-username">username</p>
        </div>
      </div>
    );
  }
}

export default Thumbnail;
