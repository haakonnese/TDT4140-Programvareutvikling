import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

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
}));

export default function Header(props) {
  //   const history = useHistory();
  const classes = useStyles();
  const { title } = props;

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
        <Link to="/logginn">
          <Button variant="outlined" size="small" className={classes.logIn}>
            Logg inn
          </Button>
        </Link>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};
