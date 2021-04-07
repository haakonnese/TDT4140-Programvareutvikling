import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
// favourite-button to add product to favourite-list
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeartButton from "../../HeartButton";

Product.propTypes = {
  product: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

function Product(props) {
  // css for jsx
  const classes = useStyles();
  const styling = {
    flex: 1,
    backgroundColor: "lightgrey",
  };
  // et Card-element med annonsens bilde, navn, pris og kategori
  return (
    <Card className={classes.root} style={props.product.sold ? styling : null}>
      {props.product.img ? (
        <div style={{ position: "relative" }}>
          <Container
            style={{
              position: "absolute",
              top: "25%",
              zIndex: 100,
              right: 0,
            }}
          >
            <Typography align="center" color="secondary" variant="h3">
              {props.product.sold ? "Solgt" : ""}
            </Typography>
          </Container>
          <CardMedia
            className={classes.media}
            image={props.product.img}
            title={props.product.name}
          ></CardMedia>
        </div>
      ) : null}
      {/* {props.product.img ? (
        <CardMedia
          className={classes.media}
          image={props.product.img}
          title={props.product.name}
        />
      ) : null} */}
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
      </CardContent>
      {/* knapp for å se ytterligere info om annonsen */}
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
        <HeartButton product={props.product} />
      </CardActions>
    </Card>
  );
}

export default Product;
