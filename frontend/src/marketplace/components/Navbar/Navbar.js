// import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  // MenuItem,
  // Menu,
  Typography,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import useStyles from "./styles";

export default function Navbar() {
  const classes = useStyles();
  const location = useLocation();
  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          className={classes.title}
          color="inherit"
        >
          <img src="" alt="Logo" height="25px" className={classes.image} />
          SELLPOINT
        </Typography>
        <div className={classes.grow} />
        {location.pathname === "/" && (
          <div className={classes.button}>
            <IconButton aria-label="userprofile">
              <AccountCircleIcon />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
