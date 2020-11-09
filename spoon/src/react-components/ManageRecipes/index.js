import React from 'react';
import Typography from '@material-ui/core/Typography';

import './styles.css';
import * as data from '../../api/data';

import Header from '../Header';
import SearchBar from '../SearchBar';
import RecipeInfo from './RecipeInfo';

class ManageRecipes extends React.Component {
  state = {
    searchedRecipe: '',
    recipes: data.allRecipes,
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
        <br />
        <br />
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
