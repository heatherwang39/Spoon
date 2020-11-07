import React from 'react';
import './styles.css';
import SearchBar from '../SearchBar'
import Grid from '@material-ui/core/Grid';
import { Slider } from '@material-ui/core';
import Tags from './Tags'

class RecipeSearch extends React.Component {
  // TODO: checkboxes are not working right now. use mapping instead. because having a key-value object in state for the tags is way 
  // too difficult.
  state = {
    tags: {
      Breakfast: false, Lunch: false, Dinner: false, Dessert: false, Vegan: false, Vegetarian: false, Meat: false
    },
    searchedRecipe: "",
    marks: [
      {value: 0, label: '0m',},
      {value: 30, label: '30m',},
      {value: 60, label: '1h',},
      {value: 90,label: '1.5h',},
      {value: 120,label: '2h',},
      {value: 150,label: '2.5h',},
      {value: 180,label: '3h',},
      {value: 210,label: '3h+',}
    ],
    durationRange: [0,210],
  }

  searchRecipe = (event) => {
    const target = event.target;
    const value = target.value.toLowerCase();
    console.log(value);
    this.setState({
      searchedRecipe: value,
    });
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
    console.log("duration filter is", newValue)
  }

  tagChosen = (event) => {
    const target = event.target
    const name = target.name
    const newtags = {...this.state.tags, [name] : target.checked}
    this.setState({
      tags: newtags,
    });
    console.log(name, "checked", target.checked)
  }

  render() {
    return (
      <div>
        
        <SearchBar 
          searchedName={this.state.searchedRecipe}
          handleInputChange={this.searchRecipe}
          placeholder="For example: chicken parmesan, broccoli"
          label="Search Recipe"
        />

        <Grid container className={"durationSlider"} spacing={1} alignItems="flex-start">
          <Grid item xs={12}>
            <p>Filter By:</p>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={2}>
            Total time:
          </Grid>
          <Grid item xs={5}>
            <Slider 
              // duration filter
              value={this.state.durationRange}
              onChange={this.durationRangeChange}
              valueLabelDisplay="off"
              getAriaValueText={this.getDurationSettings}
              min={0}
              max={210}
              step={10}
              marks={this.state.marks}
            />
          </Grid>
        </Grid>

        <Tags tagChosen={this.tagChosen} tags={this.state.tags}/>
      </div>
    );
  }
}

export default RecipeSearch;
