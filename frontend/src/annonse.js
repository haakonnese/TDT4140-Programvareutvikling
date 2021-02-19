import { React, useState } from "react";
import { PostData } from "./PostData";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import InputTextField from "./inputtext";
// import UploadComponent from "./uploadComponent";
// import Axios from "axios";

import ImageUploader from "react-images-upload";

// import PropTypes from "prop-types";

export default function Annonse(props) {
  const classes = useStyles();
  const [details, setDetails] = useState({
    vare: "",
    phone: "",
    city: "",
    beskrivelse: "",
  });

  

  // const [error, setError] = useState({ errorMessage: "", errorType: "" });

  // handle submit from button
  const handleSubmit = (e) => {
    e.preventDefault();
    // error-handeling

    // send registration to database and then do something with the result
    console.log(details.vare);
    console.log(details.phone);
    console.log(details.image);

    PostData("user/register", details).then((result) => {
      if (result.token) {
        localStorage.setItem("token", JSON.stringify(result.token));

        history.push("/");
      }
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
          Registrer annonse
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <InputTextField
            value="vare"
            type="textfield"
            id="vare"
            label="Vare"
            val={details.vare}
            details={details}
            setDetails={setDetails}
            autoFocus
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
            label="by"
            autoComplete="off"
            val={details.city}
            details={details}
            setDetails={setDetails}
          />
          <InputTextField
            value="beskrivelse"
            type="textfield"
            id="beskrivelse"
            label="Beskrivelse av vare"
            val={details.beskrivelse}
            details={details}
            setDetails={setDetails}
          />
          <ImageUploader
            value="image"
            withIcon={true}
            buttonText="Choose images"
            
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
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
        </form>
      </div>
    </Container>
  );
}
