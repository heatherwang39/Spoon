import React from 'react';
import { Link } from 'react-router-dom';
import faker from 'faker';
import RecipePopup from '../RecipePopUp';

import './styles.css';

class Thumbnail extends React.Component {
  // const = {
  //   likes,
  //   recipename,
  //   username,
  // } = this.props

  state = {
    open: false,
  };

  openPopup = () => {
    this.setState({ open: true });
  };

  closePopup = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
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
            onClick={this.openPopup}
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

        <RecipePopup
          recipeName="recipe name"
          owner="username"
          ingredients="ingredients-placeholder"
          instructions="instructions-placeholder"
          servingSize="5"
          cookTimeHrs="1"
          cookTimeMins="30"
          tags="tags-placeholder"
          recipePhoto={faker.image.animals()}
          likes="222"
          open={open}
          closePopup={this.closePopup}
        />
      </div>
    );
  }
}

export default Thumbnail;
