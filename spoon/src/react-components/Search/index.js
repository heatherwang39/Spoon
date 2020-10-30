import React from 'react';
import './styles.css';
import SearchBar from '../SearchBar'
import Header from '../Header';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';

const styles = (theme) => ({ width: 40, height: 40,})

class Search extends React.Component {
  state = {
    Breakfast: true, Lunch: true, Dinner: true, Dessert: true, Vegan: true, Vegetarian: true, Meat: true,
    searchedUser: "",
    searchedRecipe: "",
    marks: [
      {value: 0, label: '0m',},
      {value: 30, label: '30m',},
      {value: 60, label: '1h',},
      {value: 90,label: '1h 30m',},
      {value: 120,label: '2h',},
      {value: 150,label: '2h 30m',},
      {value: 180,label: '3h',},
      {value: 210,label: '3h+',}
    ],
    durationRange: [0,210],
  }

  handleInputChange = (event) => {

  }

  searchRecipe = () => {

  }
  searchUser = () => {

  }

  // duration slider
  getDurationSettings = (value) => {
    const hours = value % 60
    const mins = value - value % 60
    return `${hours}hrs ${mins}min`
  }  

  durationRangeChange = (event, newValue) => {
    this.setState({
      durationRange: newValue,
    });
  }

  tagChosen = (event) => {
    const target = event.target
    this.setState({
      [target.name]: target.checked,
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        
        <Header/>

        <SearchBar 
          searchedName={this.state.searchedRecipe}
          handleInputChange={this.handleInputChange}
          searchUser={this.searchRecipe}
          placeholder="For example: Heather"
          label="Search User"
        />

        <SearchBar 
          searchedName={this.state.searchedUser}
          handleInputChange={this.handleInputChange}
          searchUser={this.searchUser}
          placeholder="For example: chicken parmesan, broccoli"
          label="Search Recipe"
        />

        <div>Filter By:</div>
        <Grid container className={"durationSlider"} spacing={1}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={2}>
            Total time:
          </Grid>
          <Grid item xs={5}>
            <Slider
              value={this.state.durationRange}
              onChange={this.durationRangeChange}
              valueLabelDisplay="off"
              getAriaValueText={this.getDurationSettings}
              min={0}
              max={210}
              step={null}
              marks={this.state.marks}
            />
          </Grid>
        </Grid>

        <Grid container justify="center">
          <FormControlLabel
            control={<Checkbox onChange={this.tagChosen} checked={this.state[Object.keys(this.state)[0]]} name = {Object.keys(this.state)[0]}/>}
            label= {Object.keys(this.state)[0]}
          />
          <FormControlLabel
            control={<Checkbox onChange={this.tagChosen} checked={this.state[Object.keys(this.state)[1]]} name = {Object.keys(this.state)[1]}/>}
            label= {Object.keys(this.state)[1]}
          />
          <FormControlLabel
            control={<Checkbox onChange={this.tagChosen} checked={this.state[Object.keys(this.state)[2]]} name = {Object.keys(this.state)[2]}/>}
            label= {Object.keys(this.state)[2]}
          />          
        </Grid>

        <Grid container justify="center">
          <FormControlLabel
            control={<Checkbox onChange={this.tagChosen} checked={this.state[Object.keys(this.state)[3]]} name = {Object.keys(this.state)[3]}/>}
            label= {Object.keys(this.state)[3]}
          />
          <FormControlLabel
            control={<Checkbox onChange={this.tagChosen} checked={this.state[Object.keys(this.state)[4]]} name = {Object.keys(this.state)[4]}/>}
            label= {Object.keys(this.state)[4]}
          />
          <FormControlLabel
            control={<Checkbox onChange={this.tagChosen} checked={this.state[Object.keys(this.state)[5]]} name = {Object.keys(this.state)[5]}/>}
            label= {Object.keys(this.state)[5]}
          />         
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(Search);
