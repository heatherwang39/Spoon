import React from 'react';
import Link from '@material-ui/core/Link';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DropDownMenu from './DropDownMenu.js';
import HeaderButton from './HeaderButton.js';
// import { uid } from 'react-uid';

//icons
import LocalDiningOutlinedIcon from '@material-ui/icons/LocalDiningOutlined';
import SearchIcon from '@material-ui/icons/Search';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import DnsIcon from '@material-ui/icons/Dns';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './styles.css';

/* Component for the Header */
class Header extends React.Component {
  state = {
    //an array, in case we need to add more in the future
    search: {
      link: '../Search',
      name: 'search',
      mode: ['user', 'admin', 'guest'],
      icon: SearchIcon,
    },
    accountPages: [
      {
        link: `../UserProfile/${this.props.state.username}`,
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
        link: '../LogOut',
        name: 'sign in',
        mode: ['guest'],
        icon: SentimentSatisfiedIcon,
      },
      {
        link: '../RecipeCreate',
        name: 'create recipe',
        mode: ['user', 'admin'],
        icon: PostAddIcon,
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

  render() {
    const { state } = this.props;

    return (
      <div className="headerContainer">
        {/* {console.log(state)} */}
        <AppBar color="secondary">
          <Toolbar style={{ paddingTop: '0.5%', paddingBottom: '0.5%' }}>
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
              <Grid item>
                <HeaderButton page={this.state.search} />
              </Grid>
              <Grid item>
                <DropDownMenu
                  menu="account"
                  pages={this.state.accountPages}
                  userMode={state.userMode} //not to be confused with this.state
                />
              </Grid>
              <Grid item>
                {state.userMode === 'admin' ? (
                  <DropDownMenu
                    menu="manage"
                    pages={this.state.managePages}
                    userMode={state.userMode}
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
