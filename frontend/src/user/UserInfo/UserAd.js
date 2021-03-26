import { React, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  // IconButton,
} from "@material-ui/core";
// favourite-button to add product to favourite-list
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { PostPutData } from "../../service/FetchData";

UserAd.propTypes = {
  product: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

function UserAd(props) {
  // css for jsx
  const classes = useStyles();
  const [details, setDetails] = useState({ id: "", sold: false });

  const handleClick = (e) => {
    e.preventDefault();
    setDetails({ id: props.product.id, sold: !details.sold });
    // PostPutData("listing/sold", details)
    //   .then((result) => {
    //     if (result) {
    //       history.push("/");
    //     }
    //   })
    //   .catch((e) => console.log(e));
  };
  const styling = {
    flex: 1,
    backgroundColor: "lightgrey",
  };
  return (
    <Card className={classes.root} style={details.sold ? styling : null}>
      {props.product.img ? (
        <CardMedia
          className={classes.media}
          image={props.product.img}
          title={props.product.name}
        />
      ) : (
        <CircularProgress />
      )}
      <CardContent>
        <div className={classes.cardContent}>
          <Typography varient="h5" gutterBottom>
            {props.product.name}
          </Typography>
          <Typography varient="h5">{props.product.price}kr</Typography>
        </div>
        <div className={classes.cardContent}>
          <Typography varient="h2" color="textSecondary">
            {props.product.city}
          </Typography>
          <Typography varient="h2" color="textSecondary">
            {props.product.category}
          </Typography>
        </div>
        {/* <br />
        <Typography varient="h2" color="textSecondary">
          {props.product.description}
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Link to={`/endreannonse/${props.product.id}`}>
          <Button
            className={classes.infoButton}
            aria-label="Mer info"
            variant="outlined"
            color="primary"
          >
            Endre info
          </Button>
        </Link>
        <Button
          className={classes.infoButton}
          aria-label="Mer info"
          variant="outlined"
          color={details.sold ? "secondary" : "primary"}
          onClick={handleClick}
        >
          {details.sold ? "Solgt" : "Merk solgt"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserAd;
