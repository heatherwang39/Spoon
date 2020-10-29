import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LocalDiningOutlinedIcon from '@material-ui/icons/LocalDiningOutlined';

//import "./styles.css";



/* Component for the Header */
class Header extends React.Component {
  render() {
    return (
      <div className="headerContainer">
        <AppBar position="absolute" color="secondary">
            <Toolbar>
            <Typography variant="h4" >
                Feed
            </Typography>
            <LocalDiningOutlinedIcon fontSize="large"/>
            <Grid className="linksContainer" container spacing={1} justify="flex-end">  
                <Grid item>
                    <Link to={"../Feed"}>
                        <Button variant="contained">HomePage </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to={"../Search"}>
                        <Button variant="contained">Search </Button>
                    </Link> 
                </Grid>
                <Grid item>
                    <Link to={"../ManageUsers"}>
                        <Button variant="contained">ManageUsers </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to={"../ManageRecipes"}>
                        <Button variant="contained">ManageRecipes </Button>
                    </Link> 
                </Grid>                
                
            </Grid>            
            </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;