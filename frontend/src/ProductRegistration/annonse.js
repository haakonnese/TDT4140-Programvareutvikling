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

import { phoneError } from "./errorMessages";
// import UploadComponent from "./uploadComponent";
// import Axios from "axios";

// import ImageUploader from "react-images-upload";

// import PropTypes from "prop-types";

export default function Annonse(props) {
  const classes = useStyles();
  const [details, setDetails] = useState({
    item: "",
    phone: "",
    city: "",
    description: "",
    image: "",
  });
  const [preview, setPreview] = useState(false);
  // const [progress, setProgress] = useState("getUpload");
  // setImageURL = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  // const [error, setError] = useState({ errorMessage: "", errorType: "" });

  function previewImage(e) {
    const reader = new FileReader();
    setDetails({ ...details, image: e[0] });
    reader.onload = function () {
      setPreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const [error, setError] = useState({ errorMessage: "", errorType: "" });

  // handle submit from button
  const handleSubmit = (e) => {
    e.preventDefault();

    // error-handeling
    if (details.phone.length !== 8) {
      setError({ errorMessage: phoneError, errorType: "number" });

      // send registration to database and then do something with the result
    } else {
      console.log(details.item);
      console.log(details.phone);
      console.log(details.image);
      const formData = new FormData();
      formData.append("file", e[0]);
      formData.append("phone", details.phone);
      formData.append("description", details.description);
      formData.append("item", details.item);
      PostData("user/register", formData).then((result) => {
        if (result.token) {
          localStorage.setItem("token", JSON.stringify(result.token));

          history.push("/");
        }
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
          Registrer annonse
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <InputTextField
            value="item"
            type="textfield"
            id="item"
            label="Vare"
            val={details.item}
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
            errorMessage={error.errorMessage}
            errorType={error.errorType}
            displayHelper={error.errorMessage}
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
            value="description"
            type="textfield"
            id="description"
            label="Beskrivelse av vare"
            val={details.description}
            details={details}
            setDetails={setDetails}
          />
          <div>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={previewImage}
            />
            {preview && (
              <img
                src={preview}
                width="150px"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>

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
