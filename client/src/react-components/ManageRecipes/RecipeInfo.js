import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles.css';

import { deleteRecipe } from '../../actions/recipes';
import { openPopup, closePopup, handleLike } from '../../actions/recipePop';
import RecipePopup from '../RecipePopUp';

class RecipeInfo extends React.Component {
  state = {
    open: false, // Whether or not the recipe popup is open
    liked: false,
    likes: 0,
  };

  render() {
    const { recipe, manageRecipeComponent } = this.props;
    return (
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
        xl={4}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        className="recipeContainer"
      >
        <Grid item xs={3} sm={2} lg={2}>
          <img
            className="recipeCover"
            alt="food"
            src={recipe.recipePhoto}
            onClick={() => openPopup(this, recipe.likes)}
          />
        </Grid>
        <Grid item container direction="column" xs={7} sm={4} lg={4}>
          <Grid item>
            <Typography
              component="h6"
              variant="h6"
              onClick={() => openPopup(this, recipe.likes)}
            >
              {recipe.recipeName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              by {recipe.owner}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3} sm={2} lg={2}>
          <Button
            onClick={() => deleteRecipe(manageRecipeComponent, recipe._id)}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            disableRipple
          >
            Delete
          </Button>
        </Grid>
        <RecipePopup
          recipeName={recipe.recipeName}
          owner={recipe.owner}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          servingSize={recipe.servingSize}
          cookTimeHrs={recipe.cookTimeHrs}
          cookTimeMins={recipe.cookTimeMins}
          tags={recipe.tags}
          recipePhoto={recipe.recipePhoto}
          likes={this.state.likes}
          handleLike={() => handleLike(this)}
          liked={this.state.liked}
          open={this.state.open}
          closePopup={() => closePopup(this)}
        />
      </Grid>
    );
  }
}

export default RecipeInfo;
