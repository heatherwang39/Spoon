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
          ingredients="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          instructions="placeholder"
          servingSize="0"
          cookTimeHrs="0"
          cookTimeMins="0"
          tags="placeholder"
          recipePhoto="https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-770x503.jpg"
          likes="222"
          open={open}
          closePopup={this.closePopup}
        />
      </div>
    );
  }
}

export default Thumbnail;
