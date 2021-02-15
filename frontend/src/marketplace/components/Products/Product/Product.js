import React from "react";
// import ProductInfo from "../../ProductInfo/ProductInfo";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  // IconButton,
} from "@material-ui/core";
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
        <Link to={`/products/${props.product.id}`}>
          <Button
            renderAs="button"
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
