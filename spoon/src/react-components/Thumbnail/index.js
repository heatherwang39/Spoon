import React from 'react';
import { Link } from 'react-router-dom';
import RecipePopup from '../RecipePopUp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles.css';

class Thumbnail extends React.Component {
  state = {
    open: false, // Whether or not the recipe popup is open
    liked: false,
    likes: this.props.likes,
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
    const {
      recipeName,
      owner,
      ingredients,
      instructions,
      servingSize,
      cookTimeHrs,
      cookTimeMins,
      tags,
      recipePhoto,
      own,
      editRecipe,
      deleteRecipe,
    } = this.props;

    return (
      <div className="thumbnail">
        <div className="thumbnail-picture">
          <div className="thumbnail-hover" onClick={this.openPopup} />
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
            src={recipePhoto}
            alt="Recipe"
          />
        </div>
        <div className="thumbnail-recipe-name">
          <p className="thumbnail-recipe-name">{recipeName}</p>
        </div>
        <div className="thumbnail-username">
          <Link
            className="text-link"
            to={`../UserProfile/${owner}`}
          >
            <p className="thumbnail-username">{owner}</p>
          </Link>
        </div>
        <div className="thumbnail-buttons">
          {own ? (
            <div>
              <Button
                variant="text"
                color="secondary"
                size="small"
                onClick={editRecipe}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                variant="text"
                color="secondary"
                size="small"
                onClick={deleteRecipe}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>

        <RecipePopup
          recipeName={recipeName}
          owner={owner}
          ingredients={ingredients}
          instructions={instructions}
          servingSize={servingSize}
          cookTimeHrs={cookTimeHrs}
          cookTimeMins={cookTimeMins}
          tags={tags}
          recipePhoto={recipePhoto}
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
