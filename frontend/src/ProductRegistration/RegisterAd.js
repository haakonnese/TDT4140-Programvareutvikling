import { React, useState, useEffect } from "react";
import { PostPutData } from "../service/FetchData";
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
import { connect } from "react-redux";
// import { phoneError } from "./errorMessages";

// const categories = [
//   { type: "Kjøretøy" },
//   { type: "Sportsutsyr" },
//   { type: "Bøker" },
//   { type: "Elektronikk" },
//   { type: "Leker" },
//   { type: "Annet" },
// ];

function RegisterAd(props) {
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
  useEffect(() => {
    if (props.details) {
      setDetails(props.details);
      setPreview(props.details.img);
    }
  }, []);
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
    let allow = true;
    for (const key in details) {
      if (
        ["price", "name", "city", "category", "description", "img"].includes(
          key
        ) &&
        (details[key] === "" || details[key] === null)
      ) {
        allow = false;
      }
    }
    if (allow) {
      const formData = new FormData();
      if (!(details.img instanceof String)) {
        formData.append("img", details.img);
      }
      formData.append("category", details.category);
      formData.append("description", details.description);
      formData.append("name", details.name);
      formData.append("price", details.price);
      formData.append("city", details.city);
      formData.append("created_by_user", "");
      let method = "POST";
      let type = "listing/register";
      if (props.edit) {
        formData.append("id", details.id);
        method = "PUT";
        type = "listing/listing/" + details.id + "/edit";
      }

      PostPutData(type, formData, "multipart/form-data", method)
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
            {props.edit ? "Endre" : "Registrer"} annonse
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
              noOptionsText="Kategori ikke funnet"
              options={props.categories.map((option) => option.category)}
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
                {props.edit ? "Endre" : "Last opp ett"} bilde
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
              required={!props.edit}
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
              {props.edit ? "Endre" : "Registrer"}
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
  categories: PropTypes.array,
  details: PropTypes.object,
  edit: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return { categories: state.categories };
};
export default connect(mapStateToProps)(RegisterAd);
