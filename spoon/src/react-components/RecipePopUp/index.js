import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteOutlined from '@material-ui/icons/FavoriteBorderOutlined';
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
      liked,
      handleLike,
      open,
      closePopup,
    } = this.props;

    return (
      <div>
        <Dialog open={open} scroll="paper" fullWidth maxWidth={'md'}>
          <DialogTitle>
            <Grid container className="popupTitleContainer" justify="flex-end">
              <Grid item xs={11}>
                <Typography
                  className="recipePopupTitle"
                  variant="h4"
                  color="primary"
                  align="left"
                >
                  {recipeName}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  onClick={closePopup}
                  variant="contained"
                  color="primary"
                  name="closePopup"
                >
                  <CloseIcon />
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5" color="secondary" align="left">
                  By: {owner}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  disableRipple
                  onClick={handleLike}
                  style={{ backgroundColor: 'transparent' }}
                >
                  {!liked && <FavoriteOutlined />}
                  {liked && <FavoriteIcon />}
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="primary" align="right">
                  {likes} Likes
                </Typography>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <img className="recipe-photo" src={recipePhoto} alt="food" />
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" color="secondary">
                Serving Size:
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 10 }}
              >
                {servingSize}
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" color="secondary">
                Cook Time:
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 10 }}
              >
                {cookTimeHrs} Hour(s) and {cookTimeMins} Minutes
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" color="secondary">
                Tags:
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 10 }}
              >
                {tags.join(', ')}
              </Typography>
            </div>
            <Typography variant="h6" color="secondary" align="left">
              Ingredients:
            </Typography>
            {ingredients.map((i, key) => {
              return (
                <div key={key}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="left"
                  >
                    • {i}
                  </Typography>
                </div>
              );
            })}
            <Typography variant="h6" color="secondary" align="left">
              Instructions:
            </Typography>
            {instructions.map((i, key) => {
              return (
                <div key={key}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="left"
                  >
                    {i}
                  </Typography>
                  <br />
                  <br />
                </div>
              );
            })}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default RecipePopup;
