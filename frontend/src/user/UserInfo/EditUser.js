import { React, useState, useEffect } from "react";
import { GetData, PostPutData } from "../../service/FetchData";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../../standardComponents/styles";
import InputTextField from "../../standardComponents/InputTextField";
import { useHistory } from "react-router-dom";
import { emailError, toYoungError, toOldError } from "../errorMessages";
import { connect } from "react-redux";

EditUser.propTypes = {
  errorType: PropTypes.string,
};

function EditUser() {
  const classes = useStyles();
  const history = useHistory();
  const [details, setDetails] = useState({
    user: { first_name: "", last_name: "" },
    birth_year: "",
    phone: "",
    city: "",
  });

  // hook
  const [error, setError] = useState({ errorMessage: "", errorType: "" });

  useEffect(() => {
    GetData("user/user")
      .then((result) => {
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
      PostPutData("user/edit_profile", details, "application/json", "PUT")
        .then((result) => {
          // console.log(result);
          if (result) {
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
  // skjema for ?? endre navn, tlfnr, by og f??delsdato
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
            label="F??dsels??r"
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

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};
export default connect(mapStateToProps)(EditUser);
