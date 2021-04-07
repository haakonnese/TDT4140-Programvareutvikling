import React, { useState, useEffect } from "react";
import { GetData } from "../service/FetchData";
import PropTypes from "prop-types";
import { CssBaseline, Typography, Grid } from "@material-ui/core";
import Rating from "./Rating";
import { useHistory } from "react-router-dom";

// const testObject = {
//   first_name: "Håkon",
//   last_name: "Nese",
//   city: "Trondheim",
//   avg_rating: 9,
//   ratings: [
//     {
//       first_name: "Ola",
//       last_name: "Normann",
//       user_id: 90807060,
//       ad_id: 3,
//       name: "Tittel",
//       stars: 10,
//       description: "Veldig bra handel",
//     },
//     {
//       first_name: "Ola",
//       last_name: "Norman",
//       user_id: 90807060,
//       ad_id: 1,
//       name: "Tittel",
//       stars: 9,
//       description:
//         "Veldig b handel. Den gikk helt kirkefritt, fantastisk, bra, likans og smertefritt, og varen kom frem slik det var sagt. Veldig fornøyd med denne handelen.",
//     },
//     {
//       first_name: "Ola",
//       last_name: "Norma",
//       user_id: 90807060,
//       ad_id: 2,
//       name: "Tittel",
//       stars: 8,
//       description: "Veldig br handel",
//     },
//   ],
// };
function SeeRating({ match }) {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // hent info om bruker man ønsker å se
    GetData("rating/user", match.params.userId)
      .then((result) => {
        if (result) {
          setUser(result);
        } else {
          history.replace("/404");
        }
      })
      .catch(() => history.replace("/404"));
  }, []);

  return (
    <div>
      {user == null ? null : (
        <Grid
          container
          justify="flex-start"
          spacing={4}
          style={{
            width: "100%",
            margin: 0,
            marginTop: 20,
          }}
        >
          <Grid item xs={12}>
            <CssBaseline />
            <Typography variant="h3">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="h5">
              Gjennomsnittlig rating: {user.avg_rating}
            </Typography>
            <Typography variant="h5">Hjemby: {user.city}</Typography>
          </Grid>
          {/* Vis alle ratinger en bruker har fått */}
          {user.ratings.map((rating) => (
            <Grid
              item
              className="rating"
              key={rating.ad_id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Rating rating={rating} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

SeeRating.propTypes = {
  match: PropTypes.object.isRequired,
};
export default SeeRating;
