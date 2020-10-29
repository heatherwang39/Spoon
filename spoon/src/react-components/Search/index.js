import React from 'react';
import './styles.css';
import TextField from '@material-ui/core/TextField';
import Header from '../Header';
import Grid from '@material-ui/core/Grid';

class Search extends React.Component {
  state = {searchString: ""}
  render() {
    return (
      <div>
        <Header/>
        <Grid justify="center" alignItems="center" container spacing={1}>
          <Grid item xs={12}>
            <TextField
              value={this.state.searchString}
              onChange={this.handleInputChange}
              type="text"
              name="searchString"
              label="Search for recipes"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
