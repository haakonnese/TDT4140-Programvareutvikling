import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import useStyles from "./styles";

import PropTypes from "prop-types";

Product.propTypes = {
  product: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

function Product(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image=""
        title={props.product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography varient="h5" gutterBottom>
            {props.product.name}
          </Typography>
          <Typography varient="h5">{props.product.price}</Typography>
        </div>
        <Typography varient="h2" color="textSecondary">
          {props.product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          className={classes.infoButton}
          aria-label="Mer info"
          variant="outlined"
          color="primary"
        >
          Mer info
        </Button>
        <IconButton className={classes.iconButton} aria-label="Favoriser">
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product;
