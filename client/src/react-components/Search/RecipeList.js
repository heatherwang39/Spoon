import React from 'react';
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
    alertMessage: '',
    openAlert: false,
  };

  closeAlert = () => {
    this.setState({ openAlert: false });
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
                recipeId={recipe._id}
              />
            );
          })}
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
      </div>
    );
  }
}

export default RecipeList;
