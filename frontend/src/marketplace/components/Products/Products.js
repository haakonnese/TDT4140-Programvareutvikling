import React from "react";
import { Grid } from "@material-ui/core";
import PostData from "../service/PostData";
import Product from "./Product/Product";

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

function Products() {
  PostData("login", "")
    .then((result) => {
      console.log(result);
      if (result.product) {
        products.push(result.product);
      } else {
        console.log("Feil");
      }
    })
    .catch((error) => {
      console.log("Feil", error);
    });

  return (
    <main>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
