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
import { connect } from "react-redux";
import store from "./reducers";
import { Link, useHistory } from "react-router-dom";

// style til header
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
}));

function Header(props) {
  const classes = useStyles();
  const { title, loggedIn } = props;
  const history = useHistory();

  // sirkel med muligheter til innlogget bruker
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // vis muligheter til innlogget bruker
  const handleMenu = (event) => {
    setAnchorEl(event.target);
  };

  // skjul muligheter til innlogget bruker
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
              <MenuItem
                component={Link}
                to="/brukerprofil"
                onClick={handleClose}
              >
                Min profil
              </MenuItem>
              <MenuItem
                component={Link}
                to="/brukerannonser"
                onClick={handleClose}
              >
                Mine annonser
              </MenuItem>
              <MenuItem
                component={Link}
                to="/lagredeannonser"
                onClick={handleClose}
              >
                Lagrede annonser
              </MenuItem>
              <MenuItem component={Link} to="/opprett" onClick={handleClose}>
                Opprett annonse
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  store.dispatch({
                    type: "UPDATE_LOGGED_IN",
                    payload: false,
                  });
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
};

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};
export default connect(mapStateToProps)(Header);
