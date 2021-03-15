import { React, useState, useEffect } from "react";
import { GetData } from "../../service/FetchData";
import PropTypes from "prop-types";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   Typography,
//   Container,
//   TextField,
// } from "@material-ui/core";
// import { Autocomplete } from "@material-ui/lab";
// import PostAdd from "@material-ui/icons/PostAdd";
// import useStyles from "../../standardComponents/styles";
// import InputTextField from "../../standardComponents/InputTextField";
import { useHistory } from "react-router-dom";
import Registration from "../../user/Registration";
// import { phoneError } from "./errorMessages";

// const categories = [
//   { type: "Kjøretøy" },
//   { type: "Sportsutsyr" },
//   { type: "Bøker" },
//   { type: "Elektronikk" },
//   { type: "Leker" },
//   { type: "Annet" },
// ];

EditUser.propTypes = {
  match: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

export default function EditUser({ match }) {
  // const classes = useStyles();
  const history = useHistory();
  const [details, setDetails] = useState(false);

  useEffect(() => {
    GetData("listing/listing", match.params.id)
      .then((result) => {
        if (result.id) {
          result.img = "http://127.0.0.1:8000" + result.img;
          result.price = result.price.toString();
          console.log(result);
          setDetails(result);
          // console.log(products);
        } else {
          console.log("Feil");
        }
      })
      .catch(() => {
        history.push("/404");
      });
  }, []);

  return (
    <div>
      {details ? (
        <Registration loggedIn={true} details={details} edit={true} />
      ) : (
        ""
      )}
    </div>
  );
}
