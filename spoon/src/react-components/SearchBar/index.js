import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class SearchBar extends React.Component {
  render() {
    const {
      searchedName,
      handleInputChange,
      searchUser,
      placeholder,
      label,
    } = this.props;
    return (
      <div>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={5}>
            <TextField
              value={searchedName}
              onChange={handleInputChange}
              type="text"
              name="searchedName"
              placeholder={placeholder}
              label={label}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={searchUser}
              variant="contained"
              color="secondary"
              size="large"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SearchBar;
