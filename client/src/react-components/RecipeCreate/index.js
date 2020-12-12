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
    cookTimeHrs: '0',
    cookTimeMins: '',
    og_tags: {
      Breakfast: false, Lunch: false, Dinner: false, Dessert: false, Vegan: false, NutFree: false
    },
    tags: [],
    recipePhoto: '',
    likes: '0',
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

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  jsonInputChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value.toString().split('\n'),
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
    if (!recipeName || !ingredients || !instructions || !servingSize || !cookTimeMins || !recipePhoto) {
      alert('Please fill out all the required fields!');
    } else {
      addRecipe(this, this.props.appState.username);
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
              <form className="image-form" onSubmit={(e) => {
                e.preventDefault();
                changeRecipePhoto(e.target, this);
              }}>
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
                  Upload Photo*
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <img
              src={this.state.recipePhoto.image_url}
              alt="Recipe Food"
              id="placeholderRecipeCreateImage"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
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
              required
              multiline
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
