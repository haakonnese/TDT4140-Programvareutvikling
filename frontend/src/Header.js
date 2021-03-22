import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
// import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between",
    overflowX: "auto",
    display: "flex",
    alignItems: "center",
    color: "inherit",
  },
  toolbarTitle: {
    float: "left",
  },
  logIn: {
    float: "right",
  },
  avatar: { backgroundColor: theme.palette.secondary.main },
}));

export default function Header(props) {
  //   const history = useHistory();
  const classes = useStyles();
  const { title, loggedIn, changeLoggedIn } = props;
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    console.log();
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <Typography
            component="h2"
            variant="h5"
            color="textPrimary"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
        </Link>
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
        {loggedIn ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Min profil</MenuItem>
              <MenuItem onClick={handleClose}>Mine annonser</MenuItem>
              <MenuItem component={Link} to="/opprett" onClick={handleClose}>
                Opprett annonse
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  localStorage.removeItem("token");
                  handleClose();
                  changeLoggedIn(false);
                  history.push("/");
                }}
              >
                Logg ut
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/logginn">
            <Button variant="outlined" size="small" className={classes.logIn}>
              Logg inn
            </Button>
          </Link>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  loggedIn: PropTypes.bool,
  changeLoggedIn: PropTypes.func,
};
