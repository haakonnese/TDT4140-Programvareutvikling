import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { GetData } from "../../service/FetchData";
import Product from "./Product/Product";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function Products(props) {
  // Product test
  // const product = [
  //   {
  //     id: 1,
  //     name: "stol",
  //     description: "lite brukt stol til god pris",
  //     price: 200,
  //     firstName: "Hans",
  //     lastName: "Pettersen",
  //     sellerTlf: 98765432,
  //     imgUrl:
  //       "https://www.if.no/magasinet/imageshop/img_shp_img_ymq7qsg42u-780x450.jpeg",
  //   },
  //   {
  //     id: 2,
  //     name: "bord",
  //     description: "lite brukt bord til god pris",
  //     price: 900,
  //     firstName: "Kari",
  //     lastName: "Bakken",
  //     sellerTlf: 12345678,
  //     imgUrl:
  //       "https://www.if.no/magasinet/imageshop/img_shp_img_ymq7qsg42u-780x450.jpeg",
  //   },
  // ];

  // hooks
  const [products, setProducts] = useState([]);
  const history = useHistory();
  let endpoint = "listing/listings";
  if (props.onlyUser && !props.loggedIn) {
    history.replaceState("/404");
  } else if (props.onlyUser) {
    endpoint = "listing/favorites";
  }
  useEffect(() => {
    GetData(endpoint)
      .then((result) => {
        if (result.length > 0) {
          result.forEach((res) => {
            res.img = "http://127.0.0.1:8000" + res.img;
          });
          setProducts(result);
        } else {
          setProducts([]);
        }
      })
      .catch(() => {
        setProducts([]);
      });
  }, [props.onlyUser]);
  return (
    <main>
      {props.onlyUser ? (
        <Grid
          container
          justify="flex-start"
          spacing={4}
          style={{
            width: "100%",
            margin: 0,
            marginTop: 10,
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Lagrede annonser</Typography>{" "}
          </Grid>
        </Grid>
      ) : null}

      <Grid
        container
        justify="flex-start"
        spacing={4}
        style={{
          width: "100%",
          margin: 0,
          marginTop: 20,
        }}
      >
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Typography>Det er ingen annonser å vise</Typography>
          </Grid>
        ) : null}
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
Products.propTypes = {
  loggedIn: PropTypes.bool,
  onlyUser: PropTypes.bool.isRequired,
};
export default Products;
