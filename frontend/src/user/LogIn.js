import { React, useState, useEffect } from "react";
import { PostData } from "../service/PostData";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import App from "../App";
import Copyright from "../service/Copyright";
import { useHistory } from "react-router-dom";

export default function LogIn() {
  // css for jsx
  const classes = useStyles();

  // used to render new component without refreshing browser
  const history = useHistory();

  // hooks
  const [details, setDetails] = useState({ email: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  // check if logged in
  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      setLoggedIn(true);
    }
  }, []);

  // submit-button. What to do when someone tries to log in
  const handleSubmit = (e) => {
    e.preventDefault();
    setWrongPassword(false);

    // send log-in credentials to database and check if they were correct
    PostData("login", details)
      .then((result) => {
        if (result.userData) {
          sessionStorage.setItem("userData", JSON.stringify(result.userData));
          setLoggedIn(true);
        } else {
          setWrongPassword(true);
        }
      })
      .catch(() => {
        setWrongPassword(true);
      });
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
          Logg inn
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
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
                onClick={(e) => history.push("/registrer")}
                variant="body2"
              >
                {"Ny? Registrer deg her"}
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
