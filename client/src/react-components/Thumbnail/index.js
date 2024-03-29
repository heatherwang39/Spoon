import React from 'react';
import { Link } from 'react-router-dom';
import RecipePopup from '../RecipePopUp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RecipeEdit from './RecipeEdit';

import './styles.css';
import {
  checkLiked,
  getRecipe,
  getRecipeToEdit,
  updateRecipe,
  deleteRecipe,
} from '../../actions/recipes';
import { getCurrentUser, addToUser } from '../../actions/users';

class Thumbnail extends React.Component {
  componentDidMount() {
    getRecipe(this, this.state.recipeId);
    getRecipeToEdit(this, this.state.recipeId);
    if (this.props.userMode !== 'guest') {
      getCurrentUser(this);
      checkLiked(this, this.state.recipeId);
    }
  }

  state = {
    open: false, // Whether or not the recipe popup is open
    liked: false, // Whether or not the logged in user has liked this recipe
    recipeId: this.props.recipeId,
    recipeName: '',
    ownerId: '', // user id of the owner
    owner: '', // username of recipe owner
    ingredients: [],
    instructions: [],
    servingSize: 0,
    cookTimeHrs: 0,
    cookTimeMins: 0,
    tags: [],
    og_tags: {
      Breakfast: false,
      Lunch: false,
      Dinner: false,
      Dessert: false,
      Vegan: false,
      NutFree: false,
    },
    recipePhoto: '', // imageSchema object
    likes: 0,
    loggedUser: {},
    editOpen: false, // Whether or not the edit recipe popup is open
    // BELOW IS FOR THE RECIPE TO EDIT
    recipeNameEdit: '',
    ownerEdit: '',
    ingredientsEdit: [],
    instructionsEdit: [],
    servingSizeEdit: 0,
    cookTimeHrsEdit: 0,
    cookTimeMinsEdit: 0,
    tagsEdit: [],
    recipePhotoEdit: '',
    likesEdit: 0,
  };

  openPopup = () => {
    this.setState({ open: true });
  };

  closePopup = () => {
    this.setState({ open: false });
  };

  editRecipe = () => {
    this.setState(
      {
        editOpen: true,
      },
      function () {
        let tags = this.state.tags;
        let new_tags = [];
        if (tags) {
          tags.map((tag) => new_tags.push(tag.toString()));
        }
        if (new_tags) {
          const og_tags = this.state.og_tags;
          for (let i = 0; i < new_tags.length; i++) {
            console.log(new_tags[i]);
            og_tags[new_tags[i]] = true;
          }
          this.setState({
            og_tags: og_tags,
            tagsEdit: og_tags,
          });
        }
      }
    );
  };

  closeEditPopup = () => {
    this.setState({ editOpen: false });
  };

  handleLike = () => {
    if (!this.state.liked) {
      // add recipe to liked of user
      this.state.loggedUser.liked.push(this.state.recipeId);
      addToUser(this.state.loggedUser._id, [
        { path: '/liked', value: this.state.loggedUser.liked },
      ]);

      // increase likes on recipe
      const likes = this.state.likes + 1;
      updateRecipe(this.state.recipeId, [{ path: '/likes', value: likes }]);
      this.setState({
        liked: true,
        likes: likes,
      });
    } else {
      // remove recipe from liked of user
      const index = this.state.loggedUser.liked.indexOf(this.state.recipeId);
      if (index !== -1) {
        this.state.loggedUser.liked.splice(index, 1);
      }
      addToUser(this.state.loggedUser._id, [
        { path: '/liked', value: this.state.loggedUser.liked },
      ]);

      // decease likes on recipe
      const likes = this.state.likes - 1;
      updateRecipe(this.state.recipeId, [{ path: '/likes', value: likes }]);
      this.setState({
        liked: false,
        likes: likes,
      });
    }
  };

  render() {
    const { open, editOpen } = this.state;

    return (
      <div className="thumbnail">
        <div className="thumbnail-picture">
          <div className="thumbnail-hover" onClick={this.openPopup} />
          <div className="thumbnail-likes">
            {this.state.owner !== this.state.loggedUser.username &&
              this.props.userMode !== 'guest' && (
                <Button
                  className="recipe-like-button"
                  color="secondary"
                  disableRipple
                  onClick={this.handleLike}
                >
                  {!this.state.liked && <FavoriteOutlined />}
                  {this.state.liked && <FavoriteIcon />}
                </Button>
              )}
            <Typography color="secondary">{this.state.likes}</Typography>
          </div>
          <img
            className="thumbnail-picture"
            src={this.state.recipePhoto}
            alt="Recipe"
          />
        </div>
        <div className="thumbnail-recipe-name">
          <p className="thumbnail-recipe-name">{this.state.recipeName}</p>
        </div>
        <div className="thumbnail-username">
          <Link
            className="text-link"
            to={`../UserProfile/${this.state.ownerId}`}
          >
            <p className="thumbnail-username">{this.state.owner}</p>
          </Link>
        </div>
        <div className="thumbnail-buttons">
          {this.state.owner === this.state.loggedUser.username ? (
            <div>
              <Button
                variant="text"
                color="secondary"
                size="small"
                onClick={() => this.editRecipe()}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                variant="text"
                color="secondary"
                size="small"
                onClick={() => deleteRecipe(this, this.state.recipeId)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>

        <RecipePopup
          recipeName={this.state.recipeName}
          owner={this.state.owner}
          ingredients={this.state.ingredients}
          instructions={this.state.instructions}
          servingSize={this.state.servingSize}
          cookTimeHrs={this.state.cookTimeHrs}
          cookTimeMins={this.state.cookTimeMins}
          tags={this.state.tags}
          recipePhoto={this.state.recipePhoto}
          likes={this.state.likes}
          handleLike={this.handleLike}
          liked={this.state.liked}
          open={open}
          closePopup={this.closePopup}
        />

        <RecipeEdit
          recipeId={this.state.recipeId}
          recipeName={this.state.recipeNameEdit}
          owner={this.state.ownerEdit}
          ingredients={this.state.ingredientsEdit}
          instructions={this.state.instructionsEdit}
          servingSize={this.state.servingSizeEdit}
          cookTimeHrs={this.state.cookTimeHrsEdit}
          cookTimeMins={this.state.cookTimeMinsEdit}
          tags={this.state.tagsEdit}
          recipePhoto={this.state.recipePhotoEdit}
          open={editOpen}
          closePopup={this.closeEditPopup}
        />
      </div>
    );
  }
}

export default Thumbnail;
