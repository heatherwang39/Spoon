import React from 'react';
// import { Link } from 'react-router-dom';
import Link from '@material-ui/core/Link';

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
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import DnsIcon from '@material-ui/icons/Dns';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import "./styles.css";

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
        link: '../UserProfile/user1', //hard coded for now, not sure how this is impl in the end
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

  // componentDidMount(){
  //   const newAccPages = {...this.state.accountPages[0], link : `../UserProfile/${this.props.username}`}
  //   this.setState({accountPages: newAccPages})
  // }

  render() {
    const { userMode, username } = this.props;

    return (
      <div className="headerContainer">
      {console.log(this.state.accountPages)}
        <AppBar color="secondary">
          <Toolbar style={{paddingTop:"0.5%", paddingBottom:"0.5%"}}>
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
                  pages={this.state.accountPages}
                  userMode={this.props.userMode}
                />
              </Grid>
              <Grid item>
                {userMode == 'admin' ? (
                  <DropDownMenu
                    menu="manage"
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
