import React from 'react';
import { Link } from 'react-router-dom';
import faker from 'faker';
import RecipePopup from '../RecipePopUp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles.css';

class Thumbnail extends React.Component {
  state = {
    open: false, // Whether or not the recipe popup is open
    liked: false,
    likes: this.props.likes
  };

  openPopup = () => {
    this.setState({ open: true });
  };

  closePopup = () => {
    this.setState({ open: false });
  };

  handleLike = () => {
    if (!this.state.liked) {
      const likes = this.state.likes + 1;
      this.setState({
        liked: true,
        likes: likes,
      });
    } else {
      const likes = this.state.likes - 1;
      this.setState({
        liked: false,
        likes: likes,
      });
    }
  };

  render() {
    const { open } = this.state;
    const { recipename, username, editDeleteVisible, editRecipe, deleteRecipe } = this.props

    return (
      <div className="thumbnail">
        <div className="thumbnail-picture">
          <div
            className="thumbnail-hover"
            onClick={this.openPopup}
          />
          <div className="thumbnail-likes">
            <Button
              color="secondary"
              disableRipple
              onClick={this.handleLike}
              style={{ backgroundColor: 'transparent' }}
            >
              {!this.state.liked && <FavoriteOutlined />}
              {this.state.liked && <FavoriteIcon />}
            </Button>
            <Typography color="secondary">{this.state.likes}</Typography>
          </div>
          <img
            className="thumbnail-picture"
            src={faker.image.animals()}
            alt="food"
          />
        </div>
        <div className="thumbnail-recipe-name">
          <p className="thumbnail-recipe-name">{recipename}</p>
        </div>
        <div className="thumbnail-username">
          <Link
            className="text-link"
            to='../UserProfile'
          >
            <p className="thumbnail-username">{username}</p>
          </Link>
        </div>
        <div className="thumbnail-buttons">
          {editDeleteVisible ? (
            <div>
              <Button variant="text" color="secondary" size="small"
                onClick={editRecipe}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button variant="text" color="secondary" size="small"
                onClick={deleteRecipe}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>

        <RecipePopup
          recipeName={recipename}
          owner={username}
          ingredients="ingredients-placeholder"
          instructions="instructions-placeholder"
          servingSize="5"
          cookTimeHrs="1"
          cookTimeMins="30"
          tags="tags-placeholder"
          recipePhoto={faker.image.animals()}
          likes={this.state.likes}
          handleLike={this.handleLike}
          liked={this.state.liked}
          open={open}
          closePopup={this.closePopup}
        />
      </div>
    );
  }
}

export default Thumbnail;
