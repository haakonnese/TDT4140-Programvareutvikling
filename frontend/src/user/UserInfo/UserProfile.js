import { React, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  // CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  // CircularProgress,
  // IconButton,
} from "@material-ui/core";
// import PropTypes from "prop-types";
import useStyles from "./styles";
import { GetUserData } from "../../service/FetchData";

// define which type the product info will be
// UserProfile.propTypes = {
//   match: PropTypes.object.isRequired,
//   errorType: PropTypes.string,
// };

export default function UserProfile() {
  const classes = useStyles();
  const history = useHistory();
  const [details, setDetails] = useState({
    user: { first_name: "", last_name: "", username: "", password: "" },
    birth_year: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    GetUserData("user/user")
      .then((result) => {
        console.log(result);
        if (result) {
          setDetails(result);
        } else {
          console.log("Feil");
        }
      })
      .catch(() => {
        history.push("/404");
      });
  }, []);
  return (
    <main className={classes.main}>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography varient="h5" gutterBottom>
              {details.user.first_name} {details.user.last_name}
            </Typography>
          </div>
          <div className={classes.cardContent}>
            <Typography varient="h5">{details.user.username}</Typography>
            <Typography varient="h2" color="textSecondary">
              Tlf: {details.phone}
            </Typography>
            <Typography varient="h2" color="textSecondary">
              By: {details.city}
            </Typography>
          </div>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Link to="/profilredigering">
            <Button
              className={classes.infoButton}
              aria-label="rediger info"
              variant="outlined"
              color="primary"
            >
              Rediger info
            </Button>
          </Link>
          <Link to="/passordredigering">
            <Button
              className={classes.infoButton}
              aria-label="endre passord"
              variant="outlined"
              color="primary"
            >
              Endre passord
            </Button>
          </Link>
          {/* En knapp for å legge produkt til i favoritter - kan jobbes på med onClick osv. */}
          {/* Kan kommenteres ut når vi har opprettet favoritter hos bruker */}
          {/* <IconButton className={classes.iconButton} aria-label="Favoriser">
          <FavoriteBorderIcon />
        </IconButton> */}
        </CardActions>
      </Card>
    </main>
  );
}
