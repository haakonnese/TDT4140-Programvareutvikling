import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  // IconButton,
} from "@material-ui/core";
import PropTypes from "prop-types";
// favourite-button to add product to favourite-list
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useStyles from "./styles";
import { GetData } from "../../service/FetchData";
import HeartButton from "../HeartButton";

// define which type the product info will be
ProductInfo.propTypes = {
  match: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

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

function ProductInfo({ match }) {
  // hooks
  const history = useHistory();
  const [products, setProducts] = useState();

  // "match" matches given id with id from url
  useEffect(() => {
    GetData("listing/listing", match.params.id)
      .then((result) => {
        if (result.id) {
          result.img = "http://127.0.0.1:8000" + result.img;
          setProducts(result);
          // console.log(products);
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
      {products ? (
        <Card key={products.id} className={classes.root} justify="center">
          {products.img ? (
            <CardMedia
              className={classes.media}
              image={products.img}
              title={products.name}
            />
          ) : (
            <CircularProgress />
          )}
          <CardContent>
            <div className={classes.cardContent}>
              <Typography varient="h5" gutterBottom>
                {products.name}
              </Typography>
              <Typography varient="h5">{products.price}kr</Typography>
            </div>

            <div className={classes.cardContent}>
              <div className={classes.sellerInfo}>
                <Typography varient="h2">By: {products.city}</Typography>
                <Typography varient="h2">
                  Selger: {products.first_name} {products.last_name}
                </Typography>
                <Typography varient="h2">Tlf: {products.phone}</Typography>
              </div>
              <HeartButton product={products} />
            </div>
            <br />
            <Typography
              varient="h2"
              color="textSecondary"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {products.description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </main>
  );
}

export default ProductInfo;
