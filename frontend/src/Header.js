import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Button, Avatar, Typography } from "@material-ui/core";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import PostAdd from "@material-ui/icons/PostAdd";
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
  ad: {
    float: "right",
    marginRight: "3em",
  },
  avatar: { backgroundColor: theme.palette.secondary.main },
}));

export default function Header(props) {
  //   const history = useHistory();
  const classes = useStyles();
  const { title, loggedIn, changeLoggedIn } = props;
  const history = useHistory();

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
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                localStorage.removeItem("token");
                changeLoggedIn(false);
                history.push("/");
              }}
              className={classes.logIn}
            >
              Logg ut
            </Button>
            <Link to="/opprett" className={classes.ad}>
              <Avatar className={classes.avatar}>
                <PostAdd />
              </Avatar>
            </Link>
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
