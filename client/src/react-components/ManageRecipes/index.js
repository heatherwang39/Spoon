import React from 'react';
import Typography from '@material-ui/core/Typography';
import { allRecipes } from './../../actions/allRecipes';

import './styles.css';

import Header from '../Header';
import SearchBar from '../SearchBar';
import RecipeList from './RecipeList';

class ManageRecipes extends React.Component {
  constructor(props) {
    super(props);
    allRecipes(this.state.recipes);
  }

  state = {
    searchedRecipe: '',
    recipes: [],
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

  render() {
    return (
      <div>
        <Header state={this.props.appState} />
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
        <RecipeList
          recipes={this.state.recipes}
          searchedRecipe={this.state.searchedRecipe}
          manageRecipeComponent={this}
        />
      </div>
    );
  }
}

export default ManageRecipes;
