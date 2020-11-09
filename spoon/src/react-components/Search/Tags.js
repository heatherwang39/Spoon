import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { uid } from 'react-uid';

class Tags extends React.Component {
  render() {
    const { tags, tagChosen } = this.props;
    const checkboxes = Object.entries(tags).map((entry) => (
      <FormControlLabel
        control={
          <Checkbox
            onChange={tagChosen}
            checked={entry[1]}
            name={entry[0]}
            disableRipple
          />
        }
        label={entry[0]}
        key={uid(entry)}
      />
    ));

    return <div>{checkboxes}</div>;
  }
}

export default Tags;
