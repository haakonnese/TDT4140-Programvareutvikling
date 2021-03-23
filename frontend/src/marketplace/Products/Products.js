import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { PostPutData } from "../../service/FetchData";
import Product from "./Product/Product";
import Filter from "./Filter";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
  useEffect(() => {
    PostPutData("listing/listings", props.filter)
      .then((result) => {
        if (result.length > 0) {
          result.forEach((res) => {
            res.img = "http://127.0.0.1:8000" + res.img;
          });
          setProducts(result);
        } else {
          setProducts(result);
        }
      })
      .catch((error) => {
        console.log("Feil", error);
      });
  }, [props.filter]);

  return (
    <main>
      <Filter />
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
  filter: PropTypes.object,
};
const mapStateToProps = (state) => {
  return { filter: state.filter };
};

export default connect(mapStateToProps)(Products);
