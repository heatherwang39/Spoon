import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LocalDiningOutlinedIcon from '@material-ui/icons/LocalDiningOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';

// import "./styles.css";

/* Component for the Header */
class Header extends React.Component {
  state = {
    pages: [
      {link: '../', name: 'feed', mode: ['user', 'admin']},
      {link: '../RecentRecipes', name: 'recent recipes', mode: ['user', 'admin', 'guest']},
      {link: '../RecipeCreate', name: 'create recipe', mode: ['user', 'admin']},
      {link: '../Search', name: 'search', mode: ['user', 'admin', 'guest']},
      {link: '../ManageUsers', name: 'manage users', mode: ['admin']},
      {link: '../ManageRecipes', name: 'manage recipes', mode: ['admin']},
      {link: '../UserProfile', name: 'my profile', mode: ['user', 'admin']},
      {link: '../AccountCreate', name: 'sign up', mode: ['guest']},
      {link: '../LogOut', name: 'log out', mode: ['user', 'admin']}
    ]
  };

  render() {
    const {userMode} = this.props;

    const headerItems = this.state.pages
    .filter((page) => {
      return page.mode.includes(userMode);
    })
    .map((page) => (
      <Grid item>
        <Link to={page.link}>
          <Button variant="contained"> {page.name} </Button>
        </Link>
      </Grid>
    ));

    return (
      <div className="headerContainer">
        <AppBar position="absolute" color="secondary">
          <Toolbar>
            <Typography variant="h4">Spoon</Typography>
            <LocalDiningOutlinedIcon fontSize="large" />
            <Grid
              className="linksContainer"
              container
              spacing={1}
              justify="flex-end"
            >
<<<<<<< HEAD
              <Grid item>
                <Link to={'../'}>
                  <Button variant="contained">HomePage </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to={'../Search'}>
                  <Button variant="contained">Search </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to={'../ManageUsers'}>
                  <Button variant="contained">ManageUsers </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to={'../ManageRecipes'}>
                  <Button variant="contained">ManageRecipes </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to={'../UserProfile'}>
                  <AccountCircle fontSize="large" color="action" />
                </Link>
              </Grid>
=======
              {headerItems}
>>>>>>> 7fcf6ea6c09471b9e0b4f120bcb89e3e35ce4d57
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
