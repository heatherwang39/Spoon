import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';

import './styles.css';

class RecipePopup extends React.Component {
  render() {
    const {
      recipeName,
      owner,
      ingredients,
      instructions,
      servingSize,
      cookTimeHrs,
      cookTimeMins,
      tags,
      recipePhoto,
      likes,
      open,
      closePopup,
    } = this.props;

    return (
      <div>
        <Dialog open={open} scroll="paper" fullWidth={true} maxWidth = {'md'}>
          <DialogTitle>
            <Typography variant="h4" color="primary" align="left">
              {recipeName}
            </Typography>
            <Button
              onClick={closePopup}
              variant="contained"
              color="primary"
              name="closePopup"
            >
              <CloseIcon />
            </Button>
            <Typography variant="h5" color="secondary" align="left">
              By: {owner}
            </Typography>
            <Grid container className="favouritesContainer" justify="flex-end">
              <Grid item>
                {/* // TODO: ADD FAVOURITE FUNCTION */}
                <Button color="primary">
                  <FavoriteIcon />
                </Button>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  align="right"
                >
                  {likes}
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <img class="recipe-photo" src={recipePhoto} />
            <Typography variant="body1" color="textSecondary" align="left">
              {ingredients}
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default RecipePopup;
