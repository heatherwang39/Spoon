import React from 'react';
import Typography from '@material-ui/core/Typography';
import { allRecipes, updateSearchRecipeForm } from './../../actions/recipes';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
    alertMessage: '',
    openAlert: false,
  };

  closeAlert = () => {
    this.setState({ openAlert: false });
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
          handleInputChange={(e) => updateSearchRecipeForm(this, e.target)}
          searchObject={this.searchRecipe}
          placeholder="For example: Chicken"
          label="Recipe Keyword"
        />
        <Snackbar
          open={this.state.openAlert}
          autoHideDuration={6000}
          onClose={this.closeAlert}
        >
          <MuiAlert
            onClose={this.closeAlert}
            variant="filled"
            severity="error"
          >
            {this.state.alertMessage}
          </MuiAlert>
        </Snackbar>
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
