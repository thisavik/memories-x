import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

import Input from './Input';
import Icon from './Icon';

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {}
  const handleChange = () => {}
  const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);
  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
    setShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj; // optional chaining operator
    const token = res?.tokenId;
    try {
      dispatch({type: 'AUTH', data: {result, token}});

      // redirect to the home
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  const googleFailure = (err) => {
    console.log(err);
    console.log("Google signin was Unsuccessful. Try Later");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} half autoFocus/>
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" /> 
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "password" : "text"}  handleShowPassword={handleShowPassword}/> 
            {isSignup && (
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
            clientId="1076674620579-34bbs19m1blhhnte066e8horofogpc9u.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button 
                className={classes.googleButton} 
                color="primary" 
                fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon />} 
                variant="contained"
              >
                Google Login
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
          </form>
      </Paper>
    </Container>
  )
}

export default Auth
