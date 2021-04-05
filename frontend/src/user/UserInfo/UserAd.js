import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  // IconButton,
} from "@material-ui/core";
// favourite-button to add product to favourite-list
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

UserAd.propTypes = {
  product: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

function UserAd(props) {
  // css for jsx
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {props.product.img ? (
        <CardMedia
          className={classes.media}
          image={props.product.img}
          title={props.product.name}
        />
      ) : (
        <CircularProgress />
      )}
      <CardContent>
        <div className={classes.cardContent}>
          <Typography varient="h5" gutterBottom>
            {props.product.name}
          </Typography>
          <Typography varient="h5">{props.product.price}kr</Typography>
        </div>
        <div className={classes.cardContent}>
          <Typography varient="h2" color="textSecondary">
            {props.product.city}
          </Typography>
          <Typography varient="h2" color="textSecondary">
            {props.product.category}
          </Typography>
        </div>
      </CardContent>
      {/* knapp for å komme til "endre annonse"-siden */}
      <CardActions disableSpacing className={classes.cardActions}>
        <Link to={`/endreannonse/${props.product.id}`}>
          <Button
            className={classes.infoButton}
            aria-label="Mer info"
            variant="outlined"
            color="primary"
          >
            Endre info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default UserAd;
