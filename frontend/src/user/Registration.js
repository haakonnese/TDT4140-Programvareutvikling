import { React, useState, useEffect } from "react";
import { PostPutData } from "../service/FetchData";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "../standardComponents/styles";
import Container from "@material-ui/core/Container";
import InputTextField from "../standardComponents/InputTextField";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "./../reducers";

import {
  emailError,
  passwordError,
  toYoungError,
  toOldError,
} from "./errorMessages";
function Registation(props) {
  // css for jsx
  const classes = useStyles();
  const history = useHistory();
  const { loggedIn } = props;
  const [details, setDetails] = useState({
    user: { first_name: "", last_name: "", username: "", password: "" },
    birth_year: "",
    phone: "",
    city: "",
  });
  // hooks
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState({ errorMessage: "", errorType: "" });
  // check if logged in
  useEffect(() => {
    if (loggedIn) {
      history.push("/");
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
    } else if (details.user.password !== passwordCheck) {
      setError({ errorMessage: passwordError, errorType: "password" });
    } else {
      // send registration to database and then do something with the result
      PostPutData("user/register", details)
        .then((result) => {
          // console.log(result);
          if (result.token) {
            localStorage.setItem("token", result.token);
            store.dispatch({
              type: "UPDATE_LOGGED_IN",
              payload: localStorage.getItem("token") != null,
            });
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
          Registrer deg
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
          <InputTextField
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
          <InputTextField
            value="password"
            user={true}
            type="password"
            id="password"
            label="Passord"
            errorMessage={error.errorMessage}
            errorType={error.errorType}
            autoComplete="off"
            val={details.user.password}
            details={details}
            setDetails={setDetails}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={passwordCheck}
            type="password"
            id="password2"
            label="Gjenta passord"
            error={error.errorMessage === passwordError}
            helperText={
              error.errorMessage === passwordError
                ? error.errorMessage
                : error.errorMessage === ""
                ? " "
                : false
            }
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrer
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/logginn" variant="body2">
                {"Har du allerede bruker? Logg inn her"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}

Registation.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};
export default connect(mapStateToProps)(Registation);
