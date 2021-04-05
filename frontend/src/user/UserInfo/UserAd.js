import { React, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  // CircularProgress,
  // IconButton,
} from "@material-ui/core";
// favourite-button to add product to favourite-list
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PostPutData } from "../../service/FetchData";
import Container from "react-bootstrap/Container";

UserAd.propTypes = {
  product: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

function UserAd(props) {
  // css for jsx
  const classes = useStyles();
  const [details, setDetails] = useState(props.product.sold);
  const handleClick = (e) => {
    e.preventDefault();
    PostPutData("listing/sold/", { ad: props.product.id, ad: details })
      .then(() => setDetails(!details))
      .catch((e) => console.log(e));
  };
  const styling = {
    flex: 1,
    backgroundColor: "lightgrey",
  };
  return (
    <Card className={classes.root} style={details ? styling : null}>
      {props.product.img ? (
        <div style={{ position: "relative" }}>
          <Container
            style={{
              position: "absolute",
              top: "25%",
              zIndex: 100,
              right: 0,
            }}
          >
            <Typography align="center" color="secondary" variant="h3">
              {details ? "Solgt" : ""}
            </Typography>
          </Container>
          <CardMedia
            className={classes.media}
            image={props.product.img}
            title={props.product.name}
          ></CardMedia>
        </div>
      ) : null}

      {/* {props.product.img ? (
        <CardMedia
          className={classes.media}
          image={props.product.img}
          title={props.product.name}
          
        />
      ) : (
        <CircularProgress />
      )} */}
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
          color={details ? "secondary" : "primary"}
          onClick={handleClick}
        >
          {details ? "Solgt" : "Merk solgt"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserAd;
