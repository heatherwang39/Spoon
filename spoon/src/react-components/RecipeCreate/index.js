import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import './styles.css';
import Header from '../Header';
import Tags from '../Search/Tags';

class RecipeCreate extends React.Component {
  state = {
    recipeName: '',
    owner: '', // user id
    ingredients: '',
    instructions: '',
    servingSize: '',
    cookTimeHrs: '',
    cookTimeMins: '',
    tags: {
      Breakfast: true,
      Lunch: true,
      Dinner: true,
      Dessert: true,
      Vegan: true,
      Vegetarian: true,
      Meat: true,
    },
    recipePhoto: '',
    likes: '',
  };

  tagChosen = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.checked,
    });
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  previewImage = () => {
    let recipeimageURL = this.state.recipePhoto;
    let placeholderImage = document.getElementById(
      'placeholderRecipeCreateImage'
    );
    if (recipeimageURL.match(/\.(jpeg|jpg|png)$/) != null) {
      placeholderImage.src = recipeimageURL;
    } else {
      alert('Please add a valid image URL.');
    }
  };

  createRecipe = (event) => {
    const recipeName = this.state.recipeName.trim();
    const ingredients = this.state.ingredients;
    const instructions = this.state.instructions;
    const servingSize = this.state.servingSize;
    const cookTimeHrs = this.state.cookTimeHrs;
    const cookTimeMins = this.state.cookTimeMins;
    console.log(this.state.recipePhoto);
    if (recipeName === '') {
      alert('Recipe name cannot be blank!');
    } else if (this.state.recipePhoto === '') {
      alert('Recipe photo cannot be blank!');
    } else {
      alert('u tried creating a recipe called ' + recipeName + '.');
      // this.props.requestCreateRecipe({
      //   redirect: (id) => this.props.history.push(`/view/${id}`),
      //   data: {
      //     name,
      //     description: this.state.description,
      //     ingredients: this.state.ingredients.split('\n'),
      //     imageUrl: this.state.imagePreviewUrl,
      //   },
      // });
    }
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Header />
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
              <TextField
                required
                onChange={this.handleInputChange}
                type="url"
                name="recipePhoto"
                label="Recipe Photo URL"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.previewImage}
              >
                Preview Photo
              </Button>
              {/* </label> */}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <img
              src="https://www.lesgeveninzeeland.nl/storage/media/350/placeholder.png"
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
