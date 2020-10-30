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
      { owner: 'Joyce', recipeName: 'Twice-Baked Potatoes' },
      { owner: 'Yuhan', recipeName: 'Corn Dogs' },
      { owner: 'Elsa', recipeName: 'Chicken Pot Pie' },
      { owner: 'Jon', recipeName: 'French Bread Pizza' },
      { owner: 'Aya', recipeName: 'Egg rolls' },
      { owner: 'James', recipeName: 'Chicken Parmesan' },
      { owner: 'Tyrion', recipeName: 'Chicken nuggets' },
      { owner: 'Penny', recipeName: '5' },
      { owner: 'Leonard', recipeName: '6' },
      { owner: 'Sheldon', recipeName: '7' },
      { owner: 'Raj', recipeName: '8' },
    ],
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
          searchObject={this.searchUser}
          placeholder="For example: Chicken"
          label="Recipe Keyword"
        />
        <RecipeInfo />
        <img className="recipeImage" src={require('./pizza.jpg')} alt="food" />
      </div>
    );
  }
}

export default ManageRecipes;
