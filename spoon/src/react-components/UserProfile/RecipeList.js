import React from 'react';

import './styles.css';
import Thumbnail from '../Thumbnail';

class RecipeList extends React.Component {
  render() {
    const { recipes, editRecipe, deleteRecipe } = this.props;
    return (
      recipes
        //   .filter((recipe) => {
        //     return recipe.owner === 'user1'; // REPLACE WITH RECIPE OWNER
        //   })
        .map((recipe) => {
          return (
            <Thumbnail
              recipeName={recipe.recipeName}
              owner={recipe.owner}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              servingSize={recipe.servingSize}
              cookTimeHrs={recipe.cookTimeHrs}
              cookTimeMins={recipe.cookTimeMins}
              tags={recipe.tags}
              recipePhoto={recipe.recipePhoto}
              likes={recipe.likes}
              editDeleteVisible
              editRecipe={() => editRecipe(recipe)}
              deleteRecipe={() => deleteRecipe(recipe)}
            />
          );
        })
    );
  }
}

export default RecipeList;
