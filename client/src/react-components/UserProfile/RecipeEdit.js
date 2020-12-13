import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { updateRecipe, changeRecipePhoto } from '../../actions/recipes';

import './styles.css';

import Tags from '../Search/Tags';

class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      owner: '',
      ingredients: '',
      instructions: '',
      servingSize: '',
      cookTimeHrs: '',
      cookTimeMins: '',
      og_tags: '',
      tags: '',
      recipePhoto: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipeName: nextProps.recipeName,
      owner: nextProps.owner,
      ingredients: nextProps.ingredients,
      instructions: nextProps.instructions,
      servingSize: nextProps.servingSize,
      cookTimeHrs: nextProps.cookTimeHrs,
      cookTimeMins: nextProps.cookTimeMins,
      og_tags: nextProps.og_tags,
      recipePhoto: nextProps.recipePhoto,
    });
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  tagChosen = (event) => {
    const target = event.target;
    const name = target.name;
    const newtags = { ...this.state.og_tags, [name]: target.checked };
    this.setState(
      {
        og_tags: newtags,
      },
      function () {
        let tags = Object.assign({}, this.state.og_tags);
        let new_tags = [];
        for (let key in tags) {
          let value = tags[key];
          if (value) {
            new_tags.push(key.toString());
          }
        }
        this.setState({
          tags: new_tags,
        });
      }
    );
  };

  jsonInputChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value.toString().split('\n'),
    });
  };

  editRecipe = (event) => {
    const {
      recipeName,
      ingredients,
      instructions,
      servingSize,
      cookTimeMins,
      recipePhoto,
    } = this.state;
    if (!recipeName || !ingredients || !instructions || !servingSize || !cookTimeMins || !recipePhoto) {
      alert('Please fill out all the required fields!');
    } else {
      updateRecipe(this.state.recipe.json()._id, [
        { path: '/recipeName', value: this.state.recipeName },
        { path: '/ingredients', value: this.state.ingredients },
        { path: '/instructions', value: this.state.instructions },
        { path: '/servingSize', value: this.state.servingSize },
        { path: '/cookTimeMins', value: this.state.cookTimeMins },
        { path: '/cookTimeHrs', value: this.state.cookTimeHrs },
        { path: '/tags', value: this.state.tags },
        { path: '/recipePhoto', value: this.state.recipePhoto },
      ]);
    }
    event.preventDefault();
  };

  render() {
    const { open, closePopup } = this.props;

    return (
      <div>
        <Dialog open={open} scroll="paper" fullWidth={true} maxWidth={'md'}>
          <DialogTitle>
            <Grid container className="popupTitleContainer" justify="flex-end">
              <Grid item xs={11}>
                <Typography
                  className="recipePopupText"
                  variant="h4"
                  color="primary"
                  align="left"
                >
                  Edit Recipe
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
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <Grid
              container
              className="createRecipeContainer"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={8}>
                <TextField
                  value={this.state.recipeName}
                  onChange={this.handleInputChange}
                  type="text"
                  name="recipeName"
                  label="Recipe Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={this.state.servingSize}
                  onChange={this.handleInputChange}
                  type="number"
                  name="servingSize"
                  label="Serving Size"
                  InputProps={{
                    inputProps: {
                      min: 1,
                    },
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <TextField
                    value={this.state.cookTimeHrs}
                    onChange={this.handleInputChange}
                    type="number"
                    name="cookTimeHrs"
                    label="Cook Time (Hours)"
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                  <TextField
                    value={this.state.cookTimeMins}
                    onChange={this.handleInputChange}
                    type="number"
                    name="cookTimeMins"
                    label="Cook Time (Minutes)"
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: 59,
                      },
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                  <form
                    className="image-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      changeRecipePhoto(e.target, this);
                    }}
                  >
                    <div class="image-form__field">
                      <label></label>
                      <input name="image" accept="image/*" type="file" />
                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      startIcon={<CloudUploadIcon />}
                      className="image-form__submit-button"
                    >
                      Upload New Photo*
                    </Button>
                  </form>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <img
                  src={this.state.recipePhoto.image_url}
                  alt="food"
                  id="placeholderRecipeCreateImage"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  value={this.state.ingredients}
                  onChange={this.jsonInputChange}
                  type="text"
                  name="ingredients"
                  label="Ingredients"
                  rows={8}
                  helperText="Please list each ingredient on a new line."
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  value={this.state.instructions}
                  onChange={this.jsonInputChange}
                  type="text"
                  name="instructions"
                  label="Instructions"
                  rows={10}
                  helperText="Please number each instruction listed on a new line."
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="inherit" align="left">
                  Tags:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Tags tagChosen={this.tagChosen} tags={this.state.og_tags} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={this.editRecipe}
                  variant="contained"
                  color="primary"
                  name="editRecipeButton"
                >
                  Save Edits
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default RecipeEdit;
