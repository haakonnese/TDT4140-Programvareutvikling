import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  // IconButton,
} from "@material-ui/core";
import PropTypes from "prop-types";
// favourite-button to add product to favourite-list
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useStyles from "./styles";
import { GetData } from "../../service/FetchData";
import HeartButton from "../HeartButton";
import { connect } from "react-redux";

// ProductInfo test (paste "produkt" inside useState)
// const produkt = {
//   id: 1,
//   name: "stol",
//   description: "lite brukt stol til god pris",
//   price: 200,
//   firstName: "Hans",
//   lastName: "Pettersen",
//   sellerTlf: 98765432,
//   imgUrl:
//     "https://www.if.no/magasinet/imageshop/img_shp_img_ymq7qsg42u-780x450.jpeg",
// };

function ProductInfo(props) {
  // hooks
  const history = useHistory();
  const [product, setProduct] = useState();

  // "match" matches given id with id from url
  useEffect(() => {
    GetData("listing/listing", props.match.params.id)
      .then((result) => {
        if (result.id) {
          result.img = "http://127.0.0.1:8000" + result.img;
          setProduct(result);
          // console.log(product);
        } else {
          history.replace("/404");
        }
      })
      .catch(() => {
        history.replace("/404");
      });
  }, []);

  // css for jsx
  const classes = useStyles();
  return (
    <main className={classes.main}>
      {product ? (
        <Card key={product.id} className={classes.root} justify="center">
          {product.img ? (
            <CardMedia
              className={classes.media}
              image={product.img}
              title={product.name}
            />
          ) : null}
          <CardContent>
            <div className={classes.cardContent}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="subtitle1">{product.price}kr</Typography>
            </div>

            <div className={classes.sellerInfo}>
              <div>
                <Typography variant="subtitle1">By: {product.city}</Typography>
                <Typography variant="subtitle1">
                  Selger: {product.first_name} {product.last_name}
                </Typography>
                <Typography variant="subtitle1">
                  Tlf: {product.phone}
                </Typography>
              </div>
              <div>
                <div style={{ float: "right" }}>
                  <HeartButton product={product} />
                </div>
                <div>
                  {product.rating == null && props.loggedIn ? (
                    <Link align="right" to={`/rating/${product.id}`}>
                      <Button
                        className={classes.infoButton}
                        aria-label="Mer info"
                        variant="outlined"
                        color="primary"
                      >
                        Gi tilbakemelding på produkt
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </div>
              {/* Favorite-button for adding product to favorite-list */}
              {/* <IconButton className={classes.iconButton} aria-label="Favoriser">
                    <FavoriteBorderIcon />
                  </IconButton> */}
            </div>
            <br />
            <Typography
              color="textSecondary"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </main>
  );
}
// define which type the product info will be
ProductInfo.propTypes = {
  match: PropTypes.object.isRequired,
  errorType: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};
export default connect(mapStateToProps)(ProductInfo);
