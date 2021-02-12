import { React, useState, useEffect } from "react";
import { PostData } from "../service/PostData";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import App from "../App";
import InputTextField from "./InputTextField";
import { useHistory } from "react-router-dom";
import {
  emailError,
  passwordError,
  toYoungError,
  toOldError,
} from "./errorMessages";
export default function Registation() {
  // css for jsx
  const classes = useStyles();

  // used to render new component without refreshing browser
  const history = useHistory();
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    city: "",
    birth_year: "",
    email: "",
    password: "",
  });

  // hooks
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState({ errorMessage: "", errorType: "" });
  // check if logged in
  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      setLoggedIn(true);
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
    } else if (details.password !== passwordCheck) {
      setError({ errorMessage: passwordError, errorType: "password" });
    } else {
      // send registration to database and then do something with the result
      PostData("registration", details)
        .then((result) => {
          console.log(result);
          if (result.userData) {
            sessionStorage.setItem("userData", JSON.stringify(result.userData));
            setLoggedIn(true);
          } else {
            setError({ erorMessage: emailError, errorType: "email" });
          }
        })
        .catch(() => {
          setError({ erorMessage: emailError, errorType: "email" });
        });
    }
  };
  if (loggedIn) {
    return <App />;
  }
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
            type="textfield"
            id="firstName"
            label="Fornavn"
            autoComplete="given-name"
            val={details.first_name}
            details={details}
            setDetails={setDetails}
            autoFocus
          />
          <InputTextField
            value="last_name"
            type="textfield"
            id="lastName"
            label="Etternavn"
            autoComplete="family-name"
            val={details.last_name}
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="email"
            type="email"
            id="email"
            label="E-post"
            errorMessage={error.errorMessage}
            errorType={error.errorType}
            displayHelper={emailError}
            autoComplete="email"
            val={details.email}
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="phone"
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
            type="password"
            id="password"
            label="Passord"
            errorMessage={error.errorMessage}
            errorType={error.errorType}
            autoComplete="off"
            val={details.password}
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
              <Link
                style={{ cursor: "pointer" }}
                onClick={(e) => history.push("/logginn")}
                variant="body2"
              >
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
