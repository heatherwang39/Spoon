import React from 'react';
import './styles.css';
import SearchBar from '../SearchBar'
import Header from '../Header';
import UserInfo from '../ManageUsers/UserInfo';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
import Tags from './Tags'

const styles = (theme) => ({ width: 40, height: 40,})

class Search extends React.Component {
  state = {
    tags: {Breakfast: true, Lunch: true, Dinner: true, Dessert: true, Vegan: true, Vegetarian: true, Meat: true,},
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

        <Grid container className={"durationSlider"} spacing={1} alignItems="centre">
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

        <Tags tagChosen={this.tagChosen} tags={this.state.tags}/>

      </div>
    );
  }
}

export default withStyles(styles)(Search);
