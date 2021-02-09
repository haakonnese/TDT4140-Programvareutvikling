import { React, useState, useEffect } from "react";
import { PostData } from "../service/PostData";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import App from "../App";
import Copyright from "../service/Copyright";
import InputTextField from "./InputTextField";
import { useHistory } from "react-router-dom";

export default function Registation() {
  // Error messages
  const emailError = "E-posten finnes allerede";
  const passwordError = "Passordene stemmer ikke";
  const toYoungError =
    "Du er for ung til å registrere bruker. Man må være minst 13 år";
  const toOldError = "Man kan ikke være så gammel";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");

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
      setErrorType("number");
      setErrorMessage(toOldError);
    } else if (parseInt(details.birth_year) > new Date().getFullYear() - 13) {
      setErrorMessage(toYoungError);
      setErrorType("number");
    } else if (details.password !== passwordCheck) {
      setErrorMessage(passwordError);
      setErrorType("password");
    } else {
      setErrorMessage("");
      setErrorType("");
      // send registration to database and then do something with the result
      PostData("registration", details)
        .then((result) => {
          console.log(result);
          if (result.userData) {
            sessionStorage.setItem({ userData: result });
            setLoggedIn(true);
          } else {
            console.log("Feil");
          }
        })
        .catch((error) => {
          console.log("Feil", error);
        });
    }
    console.log(details);
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
            id="first_name"
            label="Fornavn"
            autoComplete="given-name"
            details={details}
            setDetails={setDetails}
            autoFocus
          />
          <InputTextField
            value="last_name"
            type="textfield"
            id="last_name"
            label="Etternavn"
            autoComplete="family-name"
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="email"
            type="email"
            id="email"
            label="E-post"
            errorMessage={errorMessage}
            errorType={errorType}
            displayHelper={emailError}
            autoComplete="email"
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="phone"
            type="tel"
            id="tel"
            label="Telefonnummer"
            autoComplete="tel"
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="city"
            type="textfield"
            id="city"
            label="Hjemby"
            autoComplete="off"
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="birth_year"
            type="number"
            id="birth_year"
            label="Fødselsår"
            autoComplete="bday-year"
            errorMessage={errorMessage}
            errorType={errorType}
            displayHelper={errorMessage}
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="password"
            type="password"
            id="password"
            label="Passord"
            errorMessage={errorMessage}
            errorType={errorType}
            autoComplete="off"
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
            error={errorMessage === passwordError}
            helperText={
              errorMessage === passwordError
                ? errorMessage
                : errorMessage === ""
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
