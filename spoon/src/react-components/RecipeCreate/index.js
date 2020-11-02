import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uid } from 'react-uid';

import './styles.css';
import Header from '../Header';
import Tags from '../Search/Tags'

class RecipeCreate extends React.Component {
  state = {
    tags: {Breakfast: true, Lunch: true, Dinner: true, Dessert: true, Vegan: true, Vegetarian: true, Meat: true,},
    recipeName: '',
    servingSize: '',
    cookTimeHrs: '',
    cookTimeMins: '',
    recipePhoto: '',
    ingredients: '',
    instructions: '',
  };

  tagChosen = (event) => {
    const target = event.target
    this.setState({
      [target.name]: target.checked,
    });
    console.log(target.name, "checked", target.checked)
  }

  // createRecipe=(event)=> {
  //     event.preventDefault();
  //     recipeName = this.state.recipeName,
  //     servingSize = this.state.servingSize,
  //     cookTimeHrs = this.state.cookTimeHrs ? this.state.cookTimeHrs : 0,
  //     cookTimeMins = this.state.cookTimeMins,
  //     recipePhoto = this.state.recipePhoto,
  //     ingredients = this.state.ingredients,
  //     instructions = this.state.instructions
  // };

  onPhotoUpload = (event) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({ recipePhoto: reader.result });
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  handleRecipeNameChange = (event) => {
    const target = event.target;
    const value = target.value;
    this.setState({
      recipeName: value,
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Typography variant="h2" color="secondary" gutterBottom>
          Create Recipe
        </Typography>
        <Typography variant="body1" color="inherit" align="left">
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
              onChange={this.handleRecipeNameChange}
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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <label htmlFor="recipePhoto">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="recipePhoto"
                mulitple
                type="file"
              />
              <Button
                component="span"
                onClick={this.handleRecipeNameChange}
                variant="contained"
                color="tertiary"
                name="recipePhoto"
                startIcon={<CloudUploadIcon />}
              >
                Upload Photos*
              </Button>
            </label>
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
              helperText="Please list each ingredient on a separate line."
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
              helperText="Please list each instruction on a separate line."
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" color="inherit" align="left">Tags:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Tags tagChosen={this.tagChosen} tags={this.state.tags}/>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={this.createRecipe}
              variant="contained"
              color="primary"
              onClick={this.addRecipe}
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
