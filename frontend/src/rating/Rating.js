import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Typography,
  CardContent,
  //   Button,
  Link as MUILink,
} from "@material-ui/core";
import { Rating as MUIRating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";

function Rating({ rating }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography>{rating.name}</Typography>
        <br />
        <Link to={`/bruker/${rating.user_id}`}>
          <MUILink variant="body1" component="button">
            {rating.first_name} {rating.last_name}
          </MUILink>
        </Link>
        <br />
        <MUIRating
          id="stars"
          size="small"
          name="customized-10"
          readOnly
          value={rating.stars}
          max={10}
        />
        <Typography color="textSecondary">{rating.description}</Typography>
      </CardContent>
    </Card>
  );
}

Rating.propTypes = {
  rating: PropTypes.object.isRequired,
};

export default Rating;
