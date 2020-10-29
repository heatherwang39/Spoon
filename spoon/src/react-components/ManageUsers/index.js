import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import { uid } from "react-uid";
import faker from 'faker';

import './styles.css';
import Header from '../Header';

class ManageUsers extends React.Component {
    state = {
        searchedName: "",
        users:[
            {name:'Heather',followers:'5'},
            {name:'Joyce',followers:'6'},
            {name:'Yuhan',followers:'7'},
            {name:'Elsa',followers:'8'},
            {name:'Jon',followers:'5'},
            {name:'Aya',followers:'6'},
            {name:'James',followers:'7'},
            {name:'Tyrion',followers:'8'},
            {name:'Penny',followers:'5'},
            {name:'Leonard',followers:'6'},
            {name:'Sheldon',followers:'7'},
            {name:'Raj',followers:'8'},
        ],
        searchedUser:[]

    }

    handleInputChange=(event)=>{
        const target = event.target
        const value = target.value
        console.log(value)
        this.setState({
            searchedName: value,
        })
    }

    searchUser=()=>{
        console.log(this.state.searchedName)
        const searchedUser = this.state.users.filter((user)=>{return user.name===this.state.searchedName})
        this.setState({            
            users: searchedUser,
        })
    }

    deleteUser=(user)=>{
        const usersToKeep = this.state.users.filter((u)=>{return u!==user})
        this.setState({
            users:usersToKeep
        })
    }

    render() {
      return (
        <div>            
            <Header/>
            <Typography variant="h2" color="secondary" gutterBottom>ManageUsers</Typography>
            <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid item xs={5}>
                    <TextField value={this.state.searchedName}
                        onChange={this.handleInputChange}
                        type="text"
                        name="searchedName"
                        placeholder="For example: Heather"
                        label="User Name" variant="outlined" fullWidth />
                </Grid> 
                <Grid item xs={2}>                              
                    <Button onClick={this.searchUser}
                            variant="contained"
                            color="secondary"
                            size="large"
                    >Search</Button>     
                </Grid>                       

            </Grid>

            <div className="infoArea">
                {
                this.state.users.map((user)=>{
                    return(
                        <Paper className="userListContainer">
                        <Grid className="userList" container spacing={2} alignItems="center">
                            <Grid item xs={2}>
                                <img alt="avatar" src={faker.image.avatar()} />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6" color="secondary" align="left">{user.name}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6" color="primary" align="left">Followers: {user.followers}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Button 
                                        onClick={()=>this.deleteUser(user)}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Grid>                
                        </Grid>
                        </Paper>
                    )
                })}
            </div>

        </div>
        
      )
    }
}

export default ManageUsers;