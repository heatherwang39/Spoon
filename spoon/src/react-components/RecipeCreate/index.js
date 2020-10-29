import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import './styles.css';
import Header from '../Header';

class RecipeCreate extends React.Component {
    state = {
        recipeName: ""

    }
    render() {
      return (
        <div>
            <Header/>
            <Typography variant="h2" color="secondary" gutterBottom>Create Recipe</Typography>
            <Typography variant="body1" color="inherit" align="left">Fields marked with * are required.</Typography>
            <Grid container className="recipe-form" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                    <TextField required
                        onChange={this.handleInputChange}
                        type="text"
                        name="recipeName"
                        placeholder="Ex. Pumpkin Cinnamon Rolls"
                        label="Recipe Name"
                        variant="outlined" fullWidth />
                </Grid> 
                <Grid item xs={4}>
                    <TextField required 
                        onChange={this.handleInputChange}
                        type="number"
                        name="servingSize"
                        label="Serving Size"
                        InputProps={{
                            inputProps: { 
                                min: 1
                            }
                        }}
                        variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        onChange={this.handleInputChange}
                        type="number"
                        name="cookTimeHrs"
                        label="Cook Time (Hours)"
                        InputProps={{
                            inputProps: { 
                                min: 0
                            }
                        }}
                        variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <TextField required 
                        onChange={this.handleInputChange}
                        type="number"
                        name="cookTimeMins"
                        label="Cook Time (Minutes)"
                        InputProps={{
                            inputProps: { 
                                min: 1
                            }
                        }}
                        variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <label htmlFor="recipePhoto">
                        <input accept="image/*"
                            style={{ display: "none" }} 
                            id="recipePhoto"  
                            mulitple  
                            type="file"/> 
                        <Button component="span"
                            variant="contained"
                            color="tertiary"
                            name="addPhotoButton"
                            startIcon={<CloudUploadIcon />}>
                            Upload Photos
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <TextField required multiline
                        onChange={this.handleInputChange}
                        type="text"
                        name="ingredients"
                        label="Ingredients"
                        rows={8}
                        helperText="Please list each ingredient on a separate line"
                        variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField required multiline
                        onChange={this.handleInputChange}
                        type="text"
                        name="instructions"
                        label="Instructions"
                        rows={10}
                        helperText="Please list each instruction on a separate line"
                        variant="outlined" fullWidth />
                </Grid>
                
                <Grid item xl={2} lg={2} xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addRecipe}
                        name="addRecipeButton">
                        Add Recipe
                    </Button>
                </Grid>
                
            </Grid>

        </div>
      );
    }
}

export default RecipeCreate;