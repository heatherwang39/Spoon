import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import EditRecipe from './EditRecipe';

import * as data from '../../api/data';
import './styles.css';

class RecipePopup extends React.Component {
  state = {
    recipeNameEdit: '',
    usernameEdit: '',
    ingredientsEdit: '',
    instructionsEdit: '',
    servingSizeEdit: '',
    cookTimeHrsEdit: '',
    cookTimeMinsEdit: '',
    tagsEdit: '',
    recipePhotoEdit: '',
    submitEdit: '',
    recipes: data.allRecipes,
    editVisible: true, // true only if recipe owner's is logged in
  };

  editRecipe = (event) => {
    console.log('clicked edit recipe button');
  };

  onEditSubmit = (event) => {
    event.preventDefault()
    this.setState({
      items: this.state.inputValEdit,
      ingredients: this.state.ingredientValEdit,
      showRecipeEditForm: false
    });
  }

  render() {
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
      likes,
      liked,
      handleLike,
      open,
      closePopup,
    } = this.props;

    return (
      <div>
        <Dialog open={open} scroll="paper" fullWidth={true} maxWidth={'md'}>
          <DialogTitle>
            <Grid container className="popupTitleContainer" justify="flex-end">
              <Grid item xs={11}>
                <Typography
                  className="recipePopupText"
                  variant="h4"
                  color="primary"
                  align="left"
                >
                  {recipeName}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  onClick={closePopup}
                  variant="contained"
                  color="primary"
                  name="closePopup"
                >
                  <CloseIcon />
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  className="recipePopupText"
                  variant="h5"
                  color="secondary"
                  align="left"
                >
                  By: {owner}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  disableRipple
                  onClick={handleLike}
                  style={{ backgroundColor: 'transparent' }}
                >
                  {!liked && <FavoriteOutlined />}
                  {liked && <FavoriteIcon />}
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="primary" align="right">
                  {likes} Likes
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <img class="recipe-photo" src={recipePhoto} />
            <div class="editRecipeButton">
              {this.state.editVisible ? (
                <Button
                  onClick={this.editRecipe}
                  color="primary"
                  name="closePopup"
                  size="small"
                >
                  <EditIcon />
                  Edit
                </Button>
              ) : null}
            </div>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" color="secondary">
                Serving Size:
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 10 }}
              >
                {servingSize}
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" color="secondary">
                Cook Time:
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 10 }}
              >
                {cookTimeHrs} Hour(s) and {cookTimeMins} Minutes
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" color="secondary">
                Tags:
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 10 }}
              >
                {tags}
              </Typography>
            </div>
            <Typography variant="h6" color="secondary" align="left">
              Ingredients:
            </Typography>
            <Typography variant="body1" color="textSecondary" align="left">
              {ingredients}
            </Typography>
            <Typography variant="h6" color="secondary" align="left">
              Instructions:
            </Typography>
            <Typography variant="body1" color="textSecondary" align="left">
              {instructions}
            </Typography>
          </DialogContent>
        </Dialog>
        {/* <EditRecipe
            recipeName={this.state.recipeNameEdit}
            owner={this.state.usernameEdit}
            ingredients={this.state.ingredientsEdit}
            instructions={this.state.instructionsEdit}
            servingSize={this.state.servingSizeEdit}
            cookTimeHrs={this.state.cookTimeHrsEdit}
            cookTimeMins={this.state.cookTimeMinsEdit}
            tags={this.state.tagsEdit}
            recipePhoto={this.state.recipePhotoEdit}
            submitEdit={this.submitEdit}
          /> */}
      </div>
    );
  }
}

export default RecipePopup;
