import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import faker from 'faker';

import './styles.css';

class RecipeInfo extends React.Component {
  render() {
    const { recipes, searchedRecipe, deleteRecipe } = this.props;
    return (
      <Grid
        container
        xs={12}
        spacing={1}
        justify="space-evenly"
        alignItems="stretch"
      >
        {recipes
          .filter((recipe) => {
            return recipe.recipeName.toLowerCase().includes(searchedRecipe);
          })
          .map((recipe) => {
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
                    src={faker.image.food()}
                  />
                </Grid>
                <Grid item container direction="column" xs={6.5} sm={4} lg={4}>
                  <Grid item>
                    <Typography component="h6" variant="h6">
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
                    onClick={() => deleteRecipe(recipe)}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    );
  }
}

export default RecipeInfo;
