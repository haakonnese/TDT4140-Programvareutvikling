import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Link as MUILink,
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

  // "match" matcher gitt id med id fra url
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
  // et Card-element som viser bildet og ytterligere info om annonsen
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
                  Selger:{" "}
                  <Link to={`/bruker/${product.created_by_user}`}>
                    <MUILink variant="body1" component="button">
                      {product.first_name} {product.last_name}
                    </MUILink>
                  </Link>
                </Typography>
                <Typography variant="subtitle1">
                  Tlf: {product.phone}
                </Typography>
              </div>
              <div>
                {/* knapper for å gi tilbakemelding og favorisere annonsen */}
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
