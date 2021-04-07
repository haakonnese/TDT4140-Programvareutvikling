import { React, useState, useEffect } from "react";
import { PostPutData } from "../service/FetchData";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "../standardComponents/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "./../reducers";

function LogIn(props) {
  // css for jsx
  const classes = useStyles();
  const { loggedIn } = props;
  // hooks
  const [details, setDetails] = useState({ username: "", password: "" });
  const [wrongPassword, setWrongPassword] = useState(false);
  const history = useHistory();
  // check if logged in
  useEffect(() => {
    if (loggedIn) {
      history.replace("/");
    }
  }, []);

  // submit-button. What to do when someone tries to log in
  const handleSubmit = (e) => {
    e.preventDefault();

    // send log-in credentials to database and check if they were correct
    PostPutData("user/login", details)
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("userId", result.user_id);
          store.dispatch({
            type: "UPDATE_LOGGED_IN",
            payload: localStorage.getItem("token") != null,
          });
          history.push("/");
        } else {
          setWrongPassword(true);
        }
      })
      .catch(() => {
        setWrongPassword(true);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logg inn
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={details.username}
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            type="email"
            id="email"
            label="Email"
            name="email"
            error={wrongPassword}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            name="password"
            label="Passord"
            type="password"
            id="password"
            error={wrongPassword}
            helperText={wrongPassword ? "Feil brukernavn eller passord!" : " "}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                value={remember}
                onChange={(e) => setRemeber(e.target.checked)}
                color="primary"
              />
            }
            label="Husk meg"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Logg Inn
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Glemt passord?
              </Link>
            </Grid> */}
            <Grid item>
              <Link
                style={{ cursor: "pointer" }}
                to="/registrer"
                variant="body2"
              >
                {"Ny? Registrer deg her"}
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

LogIn.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};
export default connect(mapStateToProps)(LogIn);
