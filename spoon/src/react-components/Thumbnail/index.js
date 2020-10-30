import React from 'react';
import { Link } from 'react-router-dom';
import faker from 'faker';

import './styles.css';

class Thumbnail extends React.Component {
  // const = {
  //   likes,
  //   recipename,
  //   username,
  // } = this.props
  render() {
    return (
      <div className="thumbnail">
        <div className="thumbnail-picture">
          <div className="likes">222 likes</div>
          <img
            className="thumbnail-picture"
            // eslint-disable-next-line global-require
            // src={require('./thumbnail_tester.jpg')}
            src={faker.image.animals()}
            alt="food"
          />
        </div>
        <div className="thumbnail-recipe-name">
          <p className="thumbnail-recipe-name">recipe name</p>
        </div>
        <div className="thumbnail-username">
          <Link className="text-link" to={'../UserProfile'}>
            <p className="thumbnail-username">username</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Thumbnail;
