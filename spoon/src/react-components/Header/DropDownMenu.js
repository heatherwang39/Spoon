import React from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import "./styles.css";

class DropDownMenu extends React.Component {
  state = {
    open: false,
    anchorRef: null,
    menuIcon: ArrowDropDownIcon,
  };

  handleClick = (event) => {
    this.setState({
      anchorRef: event.currentTarget,
      menuIcon: ArrowDropUpIcon
    });
  };

  handleClose = () => {
    this.setState({
      anchorRef: null,
      menuIcon: ArrowDropDownIcon,
    });
  };

  render() {
    const { menu, pages, userMode } = this.props;
    const MenuIcon = this.state.menuIcon;
    const menuPages = pages
      .filter((page) => {
        return page.mode.includes(userMode);
      })
      .map((page) => {
        const PageIcon = page.icon
        return(
        <MenuItem
          disableRipple
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <Grid container alignItems="center" spacing={5}>
            <Grid item xs={4}>
              <Button
                size="small"
                onClick={this.handleClose}
                color="primary"
                variant="contained"
                disableRipple
                to={Link}
                href={page.link}
                disableElevation
              >
                <PageIcon />
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" align="left" noWrap>
                {page.name}
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
      )
    }
      )

    return (
      <div>
        {
          <Button
            disableRipple
            size="small"
            color="primary"
            disableElevation
            style={{
              border: '2px solid',
              borderColor: 'white',
            }}
            // drop down menu stuff
            aria-controls={this.state.open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
            ref={this.state.anchorRef}
          >
            <MenuIcon style={{ color: 'white'}} fontSize="medium" />
            <Typography noWrap variant="button" style={{ color: 'white', marginRight: "4px"}}>
                {menu}
            </Typography>
          </Button>
        }

        {/* drop down menu */}
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          anchorEl={this.state.anchorRef}
          keepMounted
          open={Boolean(this.state.anchorRef)}
          onClose={this.handleClose}
          anchor
          PaperProps={{
            style: {
              marginTop: "0.5%",
              border: '2px solid',
              borderColor: 'Blue',
              boxShadow: 'none',
            },
          }}
        >
          {menuPages}
        </Menu>
      </div>
    );
  }
}

export default DropDownMenu;
