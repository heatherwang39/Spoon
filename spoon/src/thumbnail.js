import React from 'react';

class Thumbnail extends React.Component {
  render() {
    return (
      <div className="thumbnail">
        <div className="thumbnail-picture">
          <p>picture</p>
        </div>
        <div className="thumbnail-recipe-name">
          <p>recipe name</p>
        </div>
        <div className="thumbnail-username">
          <p>username</p>
        </div>
      </div>
    );
  }
}

export default Thumbnail;
