import React from 'react';

import './styles.css';

// const faker = require('faker');

class Thumbnail extends React.Component {
  render() {
    return (
      <div className="thumbnail">
        <div className="thumbnail-picture">
          <div className="likes">num likes</div>
          <img
            className="thumbnail-picture"
            // eslint-disable-next-line global-require
            src={require('./thumbnail_tester.jpg')}
            // src={faker.image.food()}
            alt="food"
          />
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
