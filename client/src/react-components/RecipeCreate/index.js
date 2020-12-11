import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import './styles.css';
import Header from '../Header';
import Tags from '../Search/Tags';
import { addRecipe, changeRecipePhoto } from '../../actions/recipes';

class RecipeCreate extends React.Component {
  state = {
    recipeName: '',
    owner: '',
    ingredients: '',
    instructions: '',
    servingSize: '',
    cookTimeHrs: '',
    cookTimeMins: '',
    tags: {
      Breakfast: false, Lunch: false, Dinner: false, Dessert: false, Vegan: false, NutFree: false
    },
    recipePhoto: 'https://www.lesgeveninzeeland.nl/storage/media/350/placeholder.png',
    likes: '',
  };

  tagChosen = (event) => {
    const target = event.target;
    const name = target.name;
    const newtags = { ...this.state.tags, [name]: target.checked };
    this.setState({
      tags: newtags,
    });
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  createRecipe = (event) => {
    const {
      recipeName,
      ingredients,
      instructions,
      servingSize,
      cookTimeMins,
      recipePhoto,
    } = this.state;
    if(!recipeName || !ingredients || !instructions || !servingSize || !cookTimeMins || !recipePhoto) {
      alert('Please fill out all the required fields!');
    } else {
      // BACK-END CALL
      alert('You tried creating a recipe called ' + recipeName + '! This is a back-end call that will be implemented in Phase 2.');
    }
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Header state={this.props.appState} />
        <Typography variant="h2" color="secondary" gutterBottom>
          Create Recipe
        </Typography>
        <Typography
          className="createRecipeText"
          variant="body1"
          color="inherit"
          align="left"
        >
          Fields marked with * are required.
        </Typography>
        <Grid
          container
          className="createRecipeContainer"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={8}>
            <TextField
              required
              onChange={this.handleInputChange}
              type="text"
              name="recipeName"
              placeholder="Ex. Pumpkin Cinnamon Rolls"
              label="Recipe Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
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
                required
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
              <label htmlFor="createRecipePhoto">
                <input
                  accept="image/*"
                  id="createRecipePhoto"
                  type="file"
                  onChange={(e) => {
                    e.preventDefault();
                    changeRecipePhoto(e.target.files[0], this);
                  }}
                />
                <Button
                  component="span"
                  variant="contained"
                  color="secondary"
                  name="createRecipePhoto"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Photo*
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <img
              src={this.state.recipePhoto}
              alt="Recipe Food"
              id="placeholderRecipeCreateImage"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              onChange={this.handleInputChange}
              type="text"
              name="ingredients"
              label="Ingredients"
              rows={8}
              helperText="Please list each ingredient separated by commas."
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              onChange={this.handleInputChange}
              type="text"
              name="instructions"
              label="Instructions"
              rows={10}
              helperText="Please list each instruction separated by commas."
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
            <Tags tagChosen={this.tagChosen} tags={this.state.tags} />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={this.createRecipe}
              variant="contained"
              color="primary"
              name="addRecipeButton"
            >
              Add Recipe
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default RecipeCreate;
