import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import faker from 'faker';

import './styles.css';

class RecipeInfo extends React.Component {
  render() {
    const { recipes, searchedRecipe, deleteRecipe } = this.props;
    return (
      <div className="recipesContainer">
        {recipes
          .filter((recipe) => {
            return recipe.recipeName.toLowerCase().includes(searchedRecipe);
          })
          .map((recipe) => {
            return (
              <Card className="recipeContainer">
                <div>
                  <img
                    className="recipeCover"
                    alt="food"
                    src={faker.image.food()}
                  />
                </div>
                <div className="recipeDetails">
                  <CardContent className="recipeContent">
                    <Typography component="h6" variant="h6">
                      {recipe.recipeName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      by {recipe.owner}
                    </Typography>
                  </CardContent>
                </div>
                <Button
                  onClick={deleteRecipe}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Card>
            );
          })}
      </div>
    );
  }
}

export default RecipeInfo;
