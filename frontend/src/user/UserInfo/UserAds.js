import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { GetData } from "../../service/FetchData";
import UserAd from "./UserAd";

function UserAds() {
  // hooks
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // henter ut produktene til den innloggede brukeren
    GetData("listing/listings", "mylistings")
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
  // grid med brukerens produkter
  return (
    <main>
      <Grid
        container
        spacing={4}
        style={{
          width: "100%",
          margin: 0,
          marginTop: 20,
        }}
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <UserAd product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default UserAds;
