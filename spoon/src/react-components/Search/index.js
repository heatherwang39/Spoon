import React from 'react';
import Header from '../Header';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './styles.css';
import RecipeSearch from './RecipeSearch';
import UserSearch from './UserSearch';

class Search extends React.Component {
  state = {
    currentSearch: "recipe"
  }

  switchSearch = (event) => {
    this.state.currentSearch === "recipe" ? this.setState({currentSearch: "user",}) : this.setState({currentSearch: "recipe",})
  }

  render() {
    return (
      <div>
        <Header/>
        <Grid container spacing = {2} justify = "center" >
          <Grid item xs={12}>
            <Button
                onClick={this.switchSearch}
                variant="contained"
                color="primary"
                size="small"
            >              
              {this.state.currentSearch === "recipe" ? "Search For User Instead" : "Search For Recipe Instead"}
            </Button>
          </Grid>
          <Grid item>
            {this.state.currentSearch === "recipe" ? <RecipeSearch/> : <UserSearch/>}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Search