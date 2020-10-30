import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

class Tags extends React.Component {
  render() {
    const { tags, tagChosen } = this.props;
    return (
      <div>
        <Grid container justify="center">
          <FormControlLabel
            control={(
              <Checkbox
                onChange={tagChosen}
                checked={tags[0]}
                name={Object.keys(tags)[0]}
              />
            )}
            label={Object.keys(tags)[0]}
          />
          <FormControlLabel
            control={(
              <Checkbox
                onChange={tagChosen}
                checked={tags[1]}
                name={Object.keys(tags)[1]}
              />
            )}
            label={Object.keys(tags)[1]}
          />
          <FormControlLabel
            control={(
              <Checkbox
                onChange={tagChosen}
                checked={tags[2]}
                name={Object.keys(tags)[2]}
              />
            )}
            label={Object.keys(tags)[2]}
          />
          <FormControlLabel
            control={(
              <Checkbox
                onChange={tagChosen}
                checked={tags[3]}
                name={Object.keys(tags)[3]}
              />
            )}
            label={Object.keys(tags)[3]}
          />
        </Grid>
        <Grid container justify="center">
          <FormControlLabel
            control={(
              <Checkbox
                onChange={tagChosen}
                checked={tags[4]}
                name={Object.keys(tags)[4]}
              />
            )}
            label={Object.keys(tags)[4]}
          />
          <FormControlLabel
            control={(
              <Checkbox
                onChange={tagChosen}
                checked={tags[5]}
                name={Object.keys(tags)[5]}
              />
            )}
            label={Object.keys(tags)[5]}
          />
        </Grid>
      </div>
    );
  }
}

export default Tags;
