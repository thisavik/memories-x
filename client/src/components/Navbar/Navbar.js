import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from "./styles";
import memories from "../../image/memories.png";

const Navbar = () => {

  const classes = useStyles();

  const user = null;

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center" component={Link} to="/">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL}>
              {user.result.name.charAt[0]}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary" className={classes.logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button component={Link} to='/auth' variant="contained" color="secondary">Sign In</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
