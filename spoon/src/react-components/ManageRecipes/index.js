import React from 'react';
import Typography from '@material-ui/core/Typography';

import './styles.css';

import Header from '../Header';
import SearchBar from '../SearchBar';
import RecipeInfo from './RecipeInfo';
import faker from 'faker';

class ManageRecipes extends React.Component {
  state = {
    searchedRecipe: '',
    recipes: [
      { owner: 'Heather', recipeName: 'Homemade Pizza' },
      { owner: 'Joyce', recipeName: 'Baked Potatoes' },
      { owner: 'Yuhan', recipeName: 'Corn Dogs' },
      { owner: 'Elsa', recipeName: 'Chicken Pie' },
      { owner: 'Jon', recipeName: 'French Bread' },
      { owner: 'Aya', recipeName: 'Egg rolls' },
      { owner: 'James', recipeName: 'Chicken Parmesan' },
      { owner: 'Tyrion', recipeName: 'Chicken nuggets' },
      { owner: 'Penny', recipeName: 'Baked Beef' },
      { owner: 'Leonard', recipeName: 'Chicken wings' },
      { owner: 'Sheldon', recipeName: 'Chicken breast' },
      { owner: 'Raj', recipeName: 'Fried Egg' },
    ],
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value.toLowerCase();
    console.log(value);
    this.setState({
      searchedRecipe: value,
    });
  };

  searchRecipe = () => {
    console.log(this.state.searchedRecipe);
  };

  deleteRecipe = (recipe) => {
    const recipesToKeep = this.state.recipes.filter((r) => {
      return r !== recipe;
    });
    this.setState({
      recipes: recipesToKeep,
    });
    alert('Recipe ' + recipe.recipeName + ' has been deleted!');
  };

  render() {
    return (
      <div>
        <Header />
        <Typography variant="h2" color="secondary" gutterBottom>
          Manage Recipes
        </Typography>
        <SearchBar
          searchedKeyword={this.state.searchedRecipe}
          handleInputChange={this.handleInputChange}
          searchObject={this.searchRecipe}
          placeholder="For example: Chicken"
          label="Recipe Keyword"
        />
        <RecipeInfo
          recipes={this.state.recipes}
          searchedRecipe={this.state.searchedRecipe}
          deleteRecipe={this.deleteRecipe}
        />
      </div>
    );
  }
}

export default ManageRecipes;
