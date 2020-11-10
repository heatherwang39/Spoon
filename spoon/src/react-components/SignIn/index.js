  import React from 'react';
  import Grid from '@material-ui/core/Grid';
  import TextField from '@material-ui/core/TextField';
  import Button from '@material-ui/core/Button';
  import Typography from '@material-ui/core/Typography';

  import Header from '../Header';
  // this is both the sign in page and the page you get taken to when you log out
  class SignIn extends React.Component {
    state = {
      message: "",
      password: "",
      username: "",
      header: (<Header state={this.props.appState} />)
    }

    componentDidMount(){
      const newState = {username: "guest", userMode: "guest"}
      this.setState({
        header: (<Header state={newState} />)
      })
    }

    handleInputChange = (event) => {
      const name = event.target.name;
      this.setState({
        [name]: event.target.value,
      });
    };

    check = () => {
      if ((this.state.username === "user" && this.state.password === "user")
      || (this.state.username === "admin" && this.state.password === "admin")) {
        this.success()
      }
      else {
        this.setState({message:
          "You have entered incorrect credentials."}
        )
      }
      this.setState({
        username: "", 
        password: ""
      })
    }

    success = () => {
      const newState = {username: this.state.username, userMode: this.state.username}
      this.setState({
        header: (<Header state={newState} />)
      })
      this.setState({message:
        "You have successfully signed in!"}
      )
    }

    render() {
      return (
        <div>
          {this.state.header}
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={5}>
              <TextField
                value={this.state.username}
                onChange={this.handleInputChange}
                type="text"
                name="username"
                placeholder="e.g. user"
                label="Username"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="e.g. user"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={this.check}
                variant="outlined"
                color="secondary"
                size="large"
              >
                Sign In
              </Button>
              </Grid>
            <Grid item xs={12}>
            <Typography>{this.state.message}</Typography>
            </Grid>

         </Grid>
       </div>
     );
   }
 }

 export default SignIn;
