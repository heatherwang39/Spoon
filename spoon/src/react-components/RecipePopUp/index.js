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

// BELOW IS EXAMPLE OF HOW TO USE IT

{
  /*

<RecipePopup
    title="recipe title"
    author="username"
    photo="./thumbnail_tester.jpg"
    numLikes="num likes"
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}>
    hello hello
</RecipePopup>
+
onClick={setOpenPopup(true)}
+
import RecipePopup from '../RecipePopup';

*/
}

class RecipePopup extends React.Component {
  render() {
    const {
      title,
      author,
      photo,
      numLikes,
      children,
      openPopup,
      setOpenPopup,
    } = this.props;

    return (
      <div>
        <Dialog open={openPopup} scroll="paper">
          <DialogTitle>
            <div>
              <Typography variant="h3" color="primary" align="left">
                {title}
              </Typography>
              <Button
                onClick={setOpenPopup(false)}
                variant="contained"
                color="primary"
                name="closePopup"
              >
                <CloseIcon />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="h5" color="secondary" align="left">
              By: {author}
            </Typography>
            <img src={require(photo)} />
            <Grid container className="favouritesContainer" justify="flex-end">
              <Grid item>
                {/* TO FIX, REPLACE ONCLICK WITH APPROPRIATE ACTION*/}
                {/* <Button color="primary" onClick={handleClickOpen}><FavoriteIcon /></Button> */}
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
                  {numLikes}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body1" color="textSecondary" align="left">
              {children}
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default RecipePopup;
