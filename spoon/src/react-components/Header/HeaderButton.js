import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class HeaderButton extends React.Component {
  render() {
    const { page } = this.props;
    const PageIcon = page.icon;
    return (
      <div>
        {
          <Button
            disableRipple
            href={page.link}
            color="primary"
            disableElevation
            style={{
              border: '2px solid',
              borderColor: 'white',
            }}
          >
            <PageIcon style={{ color: 'white' }} fontSize="large" />
            <Typography noWrap variant="button" style={{ color: 'white' }}>
              {page.name}
            </Typography>
          </Button>
        }
      </div>
    );
  }
}

export default HeaderButton;
