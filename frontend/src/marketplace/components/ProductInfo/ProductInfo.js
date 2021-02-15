import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useStyles from "./styles";
import PostData from "../service/PostData";
// import Product from "../Products/Product/Product";

ProductInfo.propTypes = {
  match: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

const products = [
  {
    id: 1,
    name: "stol",
    description: "lite brukt stol til god pris",
    price: "200kr",
  },
  {
    id: 2,
    name: "bord",
    description: "lite brukt bord til god pris",
    price: "900kr",
  },
];

function ProductInfo({ match }) {
  PostData("product", "")
    .then((result) => {
      console.log(result);
      if (result.product.id) {
        products.push(result.product);
      } else {
        console.log("Feil");
      }
    })
    .catch((error) => {
      console.log("Feil", error);
    });

  const classes = useStyles();
  console.log(match);
  return (
    <main className={classes.main}>
      {products
        .filter((product) => product.id === Number(match.params.id))
        .map((product) => (
          <Card key={product.id} className={classes.root} justify="center">
            <CardMedia
              className={classes.media}
              image=""
              title={product.name}
            />
            <CardContent>
              <div className={classes.cardContent}>
                <Typography varient="h5" gutterBottom>
                  {product.name}
                </Typography>
                <Typography varient="h5">{product.price}</Typography>
              </div>
              <Typography varient="h2" color="textSecondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </main>
  );
}

export default ProductInfo;
