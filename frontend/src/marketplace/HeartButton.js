import { IconButton } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import React, { useState } from "react";
import { DeleteData, PostData } from "../service/FetchData";
import PropTypes from "prop-types";
import useStyles from "./Products/Product/styles";

HeartButton.propTypes = {
  product: PropTypes.object.isRequired,
};

export default function HeartButton(props) {
  const classes = useStyles();
  const [favorite, setFavorite] = useState(props.product.favorite);
  function toggleFavorite() {
    if (!favorite) {
      PostData("listing/favorite/save", { ad: props.product.id })
        .then(() => setFavorite(!favorite))
        .catch((e) => console.log(e));
    } else {
      DeleteData("listing/favorite/delete", props.product.id)
        .then(() => setFavorite(!favorite))
        .catch((e) => console.log(e));
    }
  }
  return (
    <IconButton
      style={{ height: "100%" }}
      className={classes.iconButton}
      aria-label="Favoriser"
      onClick={toggleFavorite}
    >
      {favorite ? (
        <Favorite color="primary" />
      ) : (
        <FavoriteBorder color="primary" />
      )}
    </IconButton>
  );
}
