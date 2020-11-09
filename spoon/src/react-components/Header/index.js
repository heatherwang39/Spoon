import React from 'react';
// import { Link } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DropDownMenu from './DropDownMenu.js';
import HeaderButton from './HeaderButton.js'
import { uid } from 'react-uid';

//icons
import LocalDiningOutlinedIcon from '@material-ui/icons/LocalDiningOutlined';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import DnsIcon from '@material-ui/icons/Dns';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
// import "./styles.css";

/* Component for the Header */
class Header extends React.Component {
  state = {
    search: //an array, in case we need to add more in the future
      {
        link: '../Search',
        name: 'search',
        mode: ['user', 'admin', 'guest'],
        icon: SearchIcon,
      },
    accountPages: [
      {
        link: '../UserProfile',
        name: 'my profile',
        mode: ['user', 'admin'],
        icon: SentimentSatisfiedIcon,
      },
      {
        link: '../AccountCreate',
        name: 'sign up',
        mode: ['guest'],
        icon: PersonAddIcon,
      },
      {
        link: '../RecipeCreate',
        name: 'create recipe',
        mode: ['user', 'admin'],
        icon: AddIcon,
      },
      {
        link: '../LogOut',
        name: 'log out',
        mode: ['user', 'admin'],
        icon: ExitToAppIcon,
      },
    ],
    managePages: [
      {
        link: '../ManageUsers',
        name: 'users',
        mode: ['admin'],
        icon: PeopleIcon,
      },
      {
        link: '../ManageRecipes',
        name: 'recipes',
        mode: ['admin'],
        icon: DnsIcon,
      },
    ],
  };

  //render methods\

  

  render() {
    const { userMode } = this.props;

    return (
      <div className="headerContainer">
        <AppBar color="secondary">
          <Toolbar>
            {/* title/feed */}
            <Link
              href={'../'}
              style={{ textDecoration: 'none', color: 'unset' }}
            >
              <Typography variant="h4">Spoon</Typography>
            </Link>
            <Link
              href={'../'}
              style={{ textDecoration: 'none', color: 'unset' }}
            >
              <LocalDiningOutlinedIcon fontSize="large" />
            </Link>

            {/* buttons */}
            <Grid
              className="linksContainer"
              container
              spacing={2}
              justify="flex-end"
            >
              <Grid item><HeaderButton page={this.state.search}/></Grid>
              <Grid item>
                <DropDownMenu
                  menu="account"
                  MenuIcon={PersonIcon}
                  pages={this.state.accountPages}
                  userMode={this.props.userMode}
                />
              </Grid>
              <Grid item>
                {userMode == 'admin' ? (
                  <DropDownMenu
                    menu="manage"
                    MenuIcon={FormatListBulletedIcon}
                    pages={this.state.managePages}
                    userMode={this.props.userMode}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
