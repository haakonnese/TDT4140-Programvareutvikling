import { React, useState, useEffect } from "react";
import { PostData, GetData } from "../../service/FetchData";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../standardComponents/styles";
import Container from "@material-ui/core/Container";
import InputTextField from "../../standardComponents/InputTextField";
import { /* Link, */ useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import {
  emailError,
  // passwordError,
  toYoungError,
  toOldError,
} from "../errorMessages";

EditUser.propTypes = {
  changeLoggedIn: PropTypes.func,
  loggedIn: PropTypes.bool,
};

export default function EditUser(props) {
  // css for jsx
  const classes = useStyles();
  const history = useHistory();
  const { changeLoggedIn, loggedIn } = props;
  const [details, setDetails] = useState({
    user: { first_name: "", last_name: "", username: "", password: "" },
    birth_year: "",
    phone: "",
    city: "",
  });
  // hooks
  // const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState({ errorMessage: "", errorType: "" });
  // gettng data
  useEffect(() => {
    if (loggedIn) {
      GetData("user/register", details)
        .then((result) => {
          if (result.token) {
            setDetails(result);
          } else {
            console.log("Feil");
          }
        })
        .catch(() => {
          history.push("/404");
        });
    }
  }, []);

  // submit-button. What to do when someone tries to register
  const handleSubmit = (e) => {
    e.preventDefault();
    // error-handeling
    if (parseInt(details.birth_year) < 1900) {
      setError({ errorMessage: toOldError, errorType: "number" });
    } else if (parseInt(details.birth_year) > new Date().getFullYear() - 13) {
      setError({ errorMessage: toYoungError, errorType: "number" });
      // } else if (details.user.password !== passwordCheck) {
      // setError({ errorMessage: passwordError, errorType: "password" });
    } else {
      // send registration to database and then do something with the result
      PostData("user/register", details)
        .then((result) => {
          // console.log(result);
          if (result.token) {
            localStorage.setItem("token", result.token);
            changeLoggedIn(true);
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
          Rediger profil
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
            on
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
            ferdig
          </Button>
          {/* <Grid container>
            <Grid item>
              <Link to="/logginn" variant="body2">
                {"Har du allerede bruker? Logg inn her"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
