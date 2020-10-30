import React from 'react';
import './styles.css';
import TextField from '@material-ui/core/TextField';
import Header from '../Header';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Slider } from '@material-ui/core';



class Search extends React.Component {
  useStyles = () => makeStyles({
    grid: {
        justify: "center",
        alignItems: "center",
        spacing:1
    },
  })

  state = {
    searchString: ""
  }
  
  render() {  
    return (
      <div>
        <Header/>
        <Grid container className = {this.useStyles.grid}>
          <Grid item xs={5}> 
            {/* //search bar */}
            <TextField
              //value={this.state.searchString}
              onChange={this.handleInputChange}
              type="text"
              name="searchString"
              label="Search for recipes"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}> 
            {/* search button */}
            <Button
            onClick={this.searchRecipe}
            variant="contained"
            color="secondary"
            size="large"
            >Search</Button>
          </Grid>
        </Grid>
        <Grid container className = {this.useStyles.grid}>
          <Grid item xs={7}>
          <Slider
            //value={this.state.durationRange}
            onChange={this.durationRangeChange}
            valueLabelDisplay="on"
            //getAriaValueText={durationLabels}
            min={10}
            max={180}
            step={10}
          />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
