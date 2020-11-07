import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

class Tags extends React.Component {
  render() {
    const { tags, tagChosen } = this.props;
    const checkboxes = Object.entries(tags).map((entry) => (
      <FormControlLabel
        control={
          <Checkbox onChange={tagChosen} checked={entry[1]} name={entry[0]} />
        }
        label={entry[0]}
      />
    ));

    return (
      <div>
        <Grid container justify="center">
          {checkboxes}
        </Grid>
      </div>
    );
  }
}

export default Tags;
