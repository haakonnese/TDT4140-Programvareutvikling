import React, { useState, useEffect } from "react";
import { Button, Grid, Container } from "@material-ui/core";
import { GetData } from "../../service/FetchData";
import Product from "./Product/Product";

function Products() {
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
  const [currentPage, setPage] = useState();
  const maxItemsPerPage = 1;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setPage(1);
    console.log(currentPage);
    GetData("listing/listings")
      .then((result) => {
        if (result.length > 0) {
          result.forEach((res) => {
            res.img = "http://127.0.0.1:8000" + res.img;
          });
          setProducts(result);
        } else {
          console.log("Feil");
        }
      })
      .catch((error) => {
        console.log("Feil", error);
      });
  }, []);

  const changeBack = () => {
    setPage(currentPage - 1);
    console.log(currentPage);
  };

  const changeNext = () => {
    setPage(currentPage + 1);
    console.log(currentPage);
  };

  return (
    <main>
      <Grid
        container
        justify="center"
        spacing={4}
        style={{
          width: "100%",
          margin: 0,
          marginTop: 20,
        }}
      >
        {products
          .slice(
            currentPage * maxItemsPerPage - maxItemsPerPage,
            currentPage * maxItemsPerPage
          )
          .map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
      <Container
        container
        justify="center"
        style={{
          maxWidth: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentPage > 1 ? (
          <Button style={{ width: "50%" }} onClick={changeBack}>
            Tilbake
          </Button>
        ) : null}
        {products.length > currentPage * maxItemsPerPage ? (
          <Button style={{ width: "50%" }} onClick={changeNext}>
            Neste
          </Button>
        ) : null}
      </Container>
    </main>
  );
}

export default Products;
