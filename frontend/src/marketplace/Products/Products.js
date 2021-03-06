import React, { useState, useEffect } from "react";
import { Button, Grid, Container, Typography, Box } from "@material-ui/core";
import { PostPutData } from "../../service/FetchData";
import Product from "./Product/Product";
import Filter from "./Filter";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Products(props) {
  // hooks
  const [currentPage, setPage] = useState(1);
  const [products, setProducts] = useState({ num_pages: 1, products: false });
  useEffect(() => {
    const data = props.filter;
    data.page = currentPage;
    if (props.onlyUser) {
      data.favorite = true;
    } else {
      data.favorite = false;
    }
    PostPutData("listing/listings", data)
      .then((result) => {
        if (result.products.length > 0) {
          result.products.forEach((res) => {
            res.img = "http://127.0.0.1:8000" + res.img;
          });
          setProducts(result);
        } else {
          setProducts({ products: [], num_pages: 1 });
        }
      })
      .catch(() => {
        setProducts({ products: [], num_pages: 1 });
      });
  }, [props.filter, currentPage, props.onlyUser, props.loggedIn]);

  useEffect(() => setPage(1), [props.filter, props.onlyUser]);
  // funksjoner for å oppdatere hvilken side man er på
  const changeBack = () => {
    setPage(currentPage - 1);
  };

  const changeNext = () => {
    setPage(currentPage + 1);
  };
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
      <Filter />
      <Grid
        container
        // justify="center"
        spacing={4}
        style={{
          width: "100%",
          margin: 0,
          marginTop: 20,
        }}
      >
        {products.products === false ? null : (
          <div style={{ width: "100%" }}>
            {products.products.length === 0 ? (
              <Grid item xs={12}>
                <Typography>Det er ingen annonser å vise</Typography>
              </Grid>
            ) : null}
          </div>
        )}
        {products.products === false
          ? null
          : products.products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Grid>
            ))}
      </Grid>
      <Container
        justify="center"
        style={{
          display: "flex",
          direction: "column",
          maxWidth: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* kanpper for å endre side */}
        <Button
          style={{ width: "50%" }}
          disabled={currentPage <= 1}
          onClick={changeBack}
        >
          Tilbake
        </Button>
        <Box ml={1} mr={1}>
          <Typography>{currentPage}</Typography>
        </Box>
        <Button
          style={{ width: "50%" }}
          disabled={currentPage >= products.num_pages}
          onClick={changeNext}
        >
          Neste
        </Button>
      </Container>
    </main>
  );
}

Products.propTypes = {
  loggedIn: PropTypes.bool,
  onlyUser: PropTypes.bool.isRequired,
  filter: PropTypes.object,
};
const mapStateToProps = (state) => {
  return { filter: state.filter, loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(Products);
