import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import './styles.css';

import { deleteRecipe } from '../../actions/manage';
import RecipePopup from '../RecipePopUp';

class RecipeInfo extends React.Component {
  state = {
    open: false, // Whether or not the recipe popup is open
  };

  openPopup = () => {
    this.setState({ open: true });
  };

  closePopup = () => {
    this.setState({ open: false });
  };

  render() {
    const { recipe, searchedRecipe, manageRecipeComponent } = this.props;
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
        <Grid item xs={3} sm={1.5} lg={1.5}>
          <img
            className="recipeCover"
            alt="food"
            src={recipe.recipePhoto}
            onClick={this.openPopup}
          />
        </Grid>
        <Grid item container direction="column" xs={6.5} sm={4} lg={4}>
          <Grid item>
            <Typography component="h6" variant="h6" onClick={this.openPopup}>
              {recipe.recipeName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              by {recipe.owner}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2.5} sm={1.5} lg={1.5}>
          <Button
            onClick={() => deleteRecipe(manageRecipeComponent, recipe)}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
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
          open={this.state.open}
          closePopup={this.closePopup}
        />
      </Grid>
    );
  }
}

export default RecipeInfo;
