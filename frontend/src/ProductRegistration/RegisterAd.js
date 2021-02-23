import { React, useState } from "react";
import { PostData } from "../service/PostData";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PostAdd from "@material-ui/icons/PostAdd";
import useStyles from "../standardComponents/styles";
import InputTextField from "../standardComponents/InputTextField";
import { useHistory } from "react-router-dom";
// import { phoneError } from "./errorMessages";

const categories = [
  { type: "Kjøretøy" },
  { type: "Sportsutsyr" },
  { type: "Bøker" },
  { type: "Elektronikk" },
  { type: "Leker" },
  { type: "Annet" },
];

export default function RegisterAd(props) {
  const classes = useStyles();
  const history = useHistory();
  const [details, setDetails] = useState({
    price: "",
    name: "",
    category: null,
    city: "",
    description: "",
    img: "",
  });

  const [preview, setPreview] = useState(false);
  function previewImage(e) {
    if (e.target.files[0]) {
      const reader = new FileReader();
      setDetails({ ...details, img: e.target.files[0] });
      reader.onload = function () {
        setPreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPreview(false);
      setDetails({ ...details, img: "" });
    }
  }

  // handle submit from button
  const handleSubmit = (e) => {
    e.preventDefault();
    // error-handeling
    let allow = true;
    // send registration to database and then do something with the result
    for (const key in details) {
      if (details[key] === "" || details[key] == null) {
        allow = false;
      }
    }
    if (allow) {
      const formData = new FormData();
      formData.append("img", details.img);
      formData.append("category", details.category);
      formData.append("description", details.description);
      formData.append("name", details.name);
      formData.append("price", details.price);
      formData.append("city", details.city);
      formData.append("created_by_user", "");
      PostData("ad/register", formData, "multipart/form-data")
        .then((result) => {
          if (result) {
            history.push("/");
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {props.loggedIn ? (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PostAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrer annonse
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <InputTextField
              value="name"
              type="textfield"
              id="item"
              label="Tittel"
              autoComplete="off"
              val={details.name}
              details={details}
              setDetails={setDetails}
              autoFocus
            />

            <InputTextField
              value="price"
              type="number"
              id="price"
              label="Pris"
              autoComplete="off"
              val={details.price}
              details={details}
              setDetails={setDetails}
            />

            <InputTextField
              value="city"
              type="textfield"
              id="city"
              label="By"
              // autoComplete="off"
              val={details.city}
              details={details}
              setDetails={setDetails}
            />

            <Autocomplete
              id="category"
              options={categories.map((option) => option.type)}
              onChange={(e, value) => {
                setDetails({ ...details, category: value });
              }}
              value={details.category}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Kategori"
                  margin="normal"
                  variant="outlined"
                />
              )}
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

            <label htmlFor="imgUpload">
              <Button
                variant="contained"
                color="secondary"
                style={{ width: "100%" }}
                component="span"
              >
                Last opp et bilde
              </Button>
            </label>
            <input
              type="file"
              id="imgUpload"
              accept="image/*"
              onChange={previewImage}
              style={{
                width: "1px",
                height: "1px",
                opacity: 0,
                display: "block",
                marginLeft: "50%",
                // overflow: "hidden",
                position: "relative",
                zIndex: -1,
              }}
              required
            />
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
              id="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrer
            </Button>
          </form>
        </div>
      ) : (
        <div>Du må logge inn for å kunne opprette en annonse</div>
      )}
    </Container>
  );
}
RegisterAd.propTypes = {
  loggedIn: PropTypes.bool,
};
