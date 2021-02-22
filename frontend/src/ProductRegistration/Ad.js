import { React, useState } from "react";
import { PostData } from "./PostData";

import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
} from "@material-ui/core";
import PostAdd from "@material-ui/icons/PostAdd";
import useStyles from "./styles";
import InputTextField from "./InputTextField";
import { phoneError } from "./errorMessages";

export default function Ad() {
  const classes = useStyles();
  const [details, setDetails] = useState({
    item: "",
    phone: "",
    city: "",
    description: "",
    image: "",
  });
  const [preview, setPreview] = useState(false);
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
      const formData = new FormData();
      formData.append("file", e[0]);
      formData.append("phone", details.phone);
      formData.append("description", details.description);
      formData.append("item", details.item);
      PostData("user/register", formData)
        .then((result) => {
          if (result.token) {
            localStorage.setItem("token", JSON.stringify(result.token));

            history.push("/");
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAdd />
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
            label="By"
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
            multiline={true}
            val={details.description}
            details={details}
            setDetails={setDetails}
          />
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={previewImage}
            style={{ display: "none" }}
          />
          <label htmlFor="imageUpload">
            <Button variant="contained" color="secondary" component="span">
              Last opp et bilde
            </Button>
          </label>
          {preview && (
            <img
              src={preview}
              width="100%"
              style={{
                objectFit: "cover",
                marginTop: "5%",
              }}
            />
          )}

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
