import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  // IconButton,
} from "@material-ui/core";
// favourite-button to add product to favourite-list
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Product.propTypes = {
  product: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

function Product(props) {
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
      ) : null}
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom>{props.product.name}</Typography>
          <Typography>{props.product.price}kr</Typography>
        </div>
        <div className={classes.cardContent}>
          <Typography color="textSecondary">{props.product.city}</Typography>
          <Typography color="textSecondary">
            {props.product.category}
          </Typography>
        </div>
        {/* <br />
        <Typography variant="h2" color="textSecondary">
          {props.product.description}
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Link to={`/products/${props.product.id}`}>
          <Button
            className={classes.infoButton}
            aria-label="Mer info"
            variant="outlined"
            color="primary"
          >
            Mer info
          </Button>
        </Link>
        {/* En knapp for å legge produkt til i favoritter - kan jobbes på med onClick osv. */}
        {/* Kan kommenteres ut når vi har opprettet favoritter hos bruker */}
        {/* <IconButton className={classes.iconButton} aria-label="Favoriser">
          <FavoriteBorderIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}

export default Product;
