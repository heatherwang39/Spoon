import React from 'react';
import { uid } from 'react-uid';
import { allRecipes } from './../../actions/recipes';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import './styles.css';

import Thumbnail from '../Thumbnail';

class RecipeList extends React.Component {
  componentDidMount() {
    allRecipes(this);
  }

  state = {
    color: 'secondary',
    recipes: [],
    openWarning: true,
  };

  closeWarning = () => {
    this.setState({ openWarning: false });
  };

  closePopup = () => {
    this.setState({ editOpen: false });
  };

  render() {
    const { tags, duration, searched } = this.props;
    return (
      <div>
        {this.state.recipes
          .filter((r) => {
            console.log(r)
            //tags
            if (
              r.tags.filter((tag) => {
                return tags[tag] === true;
              }).length !== 0
            ) {
              return true;
            } else {
              return false;
            }
          })
          .filter((r) => {
            //duration
            return (
              r.cookTimeHrs * 60 + r.cookTimeMins <= duration[1] &&
              r.cookTimeHrs * 60 + r.cookTimeMins >= duration[0]
            );
          })
          .filter((r) => {
            //search
            return r.recipeName.toLowerCase().includes(searched);
          })
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
                key={uid(recipe)}
              />
            );
          })}
        <Snackbar open={this.state.openWarning} autoHideDuration={6000} onClose={this.closeWarning}>
          <MuiAlert onClose={this.closeWarning} variant="filled" severity="error">
            Could not get all recipes!
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

export default RecipeList;
