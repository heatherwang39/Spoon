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
              editDeleteVisible={true}
              editRecipe={() => editRecipe(recipe)}
              deleteRecipe={() => deleteRecipe(recipe)}
              likes={recipe.likes}
              recipename={recipe.recipeName}
              username={recipe.owner}
            />
          );
        })
    );
  }
}

export default RecipeList;
