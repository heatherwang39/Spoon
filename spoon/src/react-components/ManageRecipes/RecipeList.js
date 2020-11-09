import React from 'react';
import Grid from '@material-ui/core/Grid';
import { uid } from 'react-uid';

import './styles.css';

import RecipeInfo from './RecipeInfo';

class RecipeList extends React.Component {
  render() {
    const { recipes, searchedRecipe, manageRecipeComponent } = this.props;
    return (
      <Grid container spacing={1} justify="flex-start" alignItems="stretch">
        {recipes
          .filter((recipe) => {
            return recipe.recipeName.toLowerCase().includes(searchedRecipe);
          })
          .map((recipe) => (
            <RecipeInfo
              key={uid(recipe)}
              recipe={recipe}
              manageRecipeComponent={manageRecipeComponent}
            />
          ))}
      </Grid>
    );
  }
}

export default RecipeList;
