import React from "react";
import { Link } from "react-router-dom";
import {
  //   Card,
  //   CardMedia,
  //   CardContent,
  //   Typography,
  //   CircularProgress,
  //   IconButton,
  Grid,
} from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "./styles";
// import { GetData } from "../../../service/FetchData";

// define which type the product info will be
UserProfile.propTypes = {
  match: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

function UserProfile() {
  // hooks
  //   const history = useHistory();
  //   const [products, setProducts] = useState();

  //   // "match" matches given id with id from url
  //   useEffect(() => {
  //     GetData("listing/listing", match.params.id)
  //       .then((result) => {
  //         if (result.id) {
  //           result.img = "http://127.0.0.1:8000" + result.img;
  //           setProducts(result);
  //           // console.log(products);
  //         } else {
  //           console.log("Feil");
  //         }
  //       })
  //       .catch(() => {
  //         history.push("/404");
  //       });
  //   }, []);

  // css for jsx
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Grid container>
        <Grid item>
          <Link to="/profilredigering" variant="body2">
            {"Rediger profil"}
          </Link>
        </Grid>
      </Grid>
    </main>
  );
}

export default UserProfile;
