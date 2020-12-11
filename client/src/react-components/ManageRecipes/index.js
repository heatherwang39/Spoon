import React from 'react';
import Typography from '@material-ui/core/Typography';
import { allRecipes } from './../../actions/recipes';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import './styles.css';

import Header from '../Header';
import SearchBar from '../SearchBar';
import RecipeList from './RecipeList';


class ManageRecipes extends React.Component {
  componentDidMount() {
    allRecipes(this);
  }

  state = {
    searchedRecipe: '',
    recipes: [],
    openWarning: false,
  };

  closeWarning = () => {
    this.setState({ openWarning: false });
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
        <Snackbar open={this.state.openWarning} autoHideDuration={6000} onClose={this.closeWarning}>
          <MuiAlert onClose={this.closeWarning} variant="filled" severity="error">
            Could not get all recipes!
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

export default ManageRecipes;
