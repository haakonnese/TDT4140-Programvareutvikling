import { IconButton } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import React, { useState } from "react";
import { DeleteData, PostPutData } from "../service/FetchData";
import PropTypes from "prop-types";
import useStyles from "./Products/Product/styles";
import { connect } from "react-redux";

function HeartButton(props) {
  const classes = useStyles();
  const [favorite, setFavorite] = useState(props.product.favorite);

  // send til forskjellige endepunkt om annonsen skal slettes fra favorittannonser
  // eller legges til der
  function toggleFavorite() {
    if (!favorite) {
      PostPutData("listing/favorite/save", { ad: props.product.id })
        .then(() => setFavorite(!favorite))
        .catch((e) => console.log(e));
    } else {
      DeleteData("listing/favorite/delete", props.product.id)
        .then(() => setFavorite(!favorite))
        .catch((e) => console.log(e));
    }
  }
  return (
    <div>
      {props.loggedIn ? (
        <IconButton
          style={{ height: "100%" }}
          className={classes.iconButton}
          aria-label="Favoriser"
          onClick={toggleFavorite}
        >
          {/* Fyll hjertet blått dersom man har lagret annonsen */}
          {favorite ? (
            <Favorite color="primary" />
          ) : (
            <FavoriteBorder color="primary" />
          )}
        </IconButton>
      ) : null}
    </div>
  );
}

HeartButton.propTypes = {
  loggedIn: PropTypes.bool,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(HeartButton);
