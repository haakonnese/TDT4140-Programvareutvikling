import { React, useState, useEffect } from "react";
import { GetUserData, PostData } from "../../service/FetchData";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { Autocomplete } from "@material-ui/lab";
// import PostAdd from "@material-ui/icons/PostAdd";
import useStyles from "../../standardComponents/styles";
import InputTextField from "../../standardComponents/InputTextField";
import { useHistory } from "react-router-dom";
// import Registration from "../../user/Registration";
// import { phoneError } from "./errorMessages";
import { emailError, toYoungError, toOldError } from "../errorMessages";

EditUser.propTypes = {
  errorType: PropTypes.string,
};

export default function EditUser() {
  const classes = useStyles();
  const history = useHistory();
  const [details, setDetails] = useState({
    user: { first_name: "", last_name: "" },
    birth_year: "",
    phone: "",
    city: "",
  });

  const [error, setError] = useState({ errorMessage: "", errorType: "" });

  useEffect(() => {
    GetUserData("user/user")
      .then((result) => {
        console.log(result);
        if (result) {
          setDetails(result);
        } else {
          console.log("Feil");
        }
      })
      .catch(() => {
        history.push("/404");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // error-handeling
    if (parseInt(details.birth_year) < 1900) {
      setError({ errorMessage: toOldError, errorType: "number" });
    } else if (parseInt(details.birth_year) > new Date().getFullYear() - 13) {
      setError({ errorMessage: toYoungError, errorType: "number" });
    } else {
      // send registration to database and then do something with the result
      const method = "PUT";
      PostData("user/register", details, "application/json", method)
        .then((result) => {
          // console.log(result);
          if (result.token) {
            localStorage.setItem("token", result.token);
            history.push("/");
          } else {
            setError({ erorMessage: emailError, errorType: "email" });
          }
        })
        .catch(() => {
          setError({ erorMessage: emailError, errorType: "email" });
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Endre info
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <InputTextField
            value="first_name"
            user={true}
            type="textfield"
            id="firstName"
            label="Fornavn"
            autoComplete="given-name"
            val={details.user.first_name}
            details={details}
            setDetails={setDetails}
            autoFocus
          />
          <InputTextField
            value="last_name"
            user={true}
            type="textfield"
            id="lastName"
            label="Etternavn"
            autoComplete="family-name"
            val={details.user.last_name}
            details={details}
            setDetails={setDetails}
          />
          {/* <InputTextField
            value="username"
            user={true}
            type="email"
            id="username"
            label="E-post"
            errorMessage={error.errorMessage}
            errorType={error.errorType}
            displayHelper={emailError}
            autoComplete="email"
            val={details.user.username}
            details={details}
            setDetails={setDetails}
          /> */}
          <InputTextField
            value="phone"
            user={false}
            type="tel"
            id="tel"
            label="Telefonnummer"
            autoComplete="tel"
            val={details.phone}
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="city"
            user={false}
            type="textfield"
            id="city"
            label="Hjemby"
            autoComplete="off"
            val={details.city}
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="birth_year"
            user={false}
            type="number"
            id="birthYear"
            label="Fødselsår"
            autoComplete="bday-year"
            errorMessage={error.errorMessage}
            errorType={error.errorType}
            displayHelper={error.errorMessage}
            val={details.birth_year}
            details={details}
            setDetails={setDetails}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Endre
          </Button>
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
