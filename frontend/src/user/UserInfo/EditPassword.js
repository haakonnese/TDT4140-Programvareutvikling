import { React, useState } from "react";
import { PostPutData } from "../../service/FetchData";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../standardComponents/styles";
import Container from "@material-ui/core/Container";
import InputTextField from "../../standardComponents/InputTextField";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { emailError, passwordError } from "../errorMessages";
export default function Registation(props) {
  // css for jsx
  const classes = useStyles();
  const history = useHistory();
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

  // submit-button. What to do when someone tries to register
  const handleSubmit = (e) => {
    e.preventDefault();
    // error-handeling
    if (details.user.password !== passwordCheck) {
      setError({ errorMessage: passwordError, errorType: "password" });
    } else {
      // send registration to database and then do something with the result
      PostPutData("user/edit_password", details, "application/json", "PUT")
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
          Endre passord
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
            Endre
          </Button>
        </form>
      </div>
    </Container>
  );
}
Registation.propTypes = {
  changeLoggedIn: PropTypes.func,
  loggedIn: PropTypes.bool,
};
