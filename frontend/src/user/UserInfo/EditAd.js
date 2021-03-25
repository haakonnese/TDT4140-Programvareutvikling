import { React, useState, useEffect } from "react";
import { GetData } from "../../service/FetchData";
import PropTypes from "prop-types";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   Typography,
//   Container,
//   TextField,
// } from "@material-ui/core";
// import { Autocomplete } from "@material-ui/lab";
// import PostAdd from "@material-ui/icons/PostAdd";
// import useStyles from "../../standardComponents/styles";
// import InputTextField from "../../standardComponents/InputTextField";
import { useHistory } from "react-router-dom";
import RegisterAd from "../../ProductRegistration/RegisterAd";
// import { phoneError } from "./errorMessages";

// const categories = [
//   { type: "Kjøretøy" },
//   { type: "Sportsutsyr" },
//   { type: "Bøker" },
//   { type: "Elektronikk" },
//   { type: "Leker" },
//   { type: "Annet" },
// ];

EditAd.propTypes = {
  match: PropTypes.object.isRequired,
  errorType: PropTypes.string,
};

export default function EditAd({ match }) {
  // const classes = useStyles();
  const history = useHistory();
  const [details, setDetails] = useState(false);

  useEffect(() => {
    GetData("listing/listing", match.params.id)
      .then((result) => {
        if (result.id) {
          result.img = "http://127.0.0.1:8000" + result.img;
          result.price = result.price.toString();
          setDetails(result);
          // console.log(products);
        } else {
          console.log("Feil");
        }
      })
      .catch(() => {
        history.push("/404");
      });
  }, []);

  // const [preview, setPreview] = useState(false);
  // function previewImage(e) {
  //   if (e.target.files[0]) {
  //     const reader = new FileReader();
  //     setDetails({ ...details, img: e.target.files[0] });
  //     reader.onload = function () {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   } else {
  //     setPreview(false);
  //     setDetails({ ...details, img: "" });
  //   }
  // }

  // handle change in form
  // const handleChange = (e) => {
  //   const value = e.target.val;
  //   const name = e.target.value;

  //   setDetails({ ...details, {name}: value });
  //   console.log(e.target.value);
  // };
  // handle submit from button
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // error-handeling
  //   let allow = true;
  //   // send registration to database and then do something with the result
  //   for (const key in details) {
  //     if (details[key] === "" || details[key] == null) {
  //       allow = false;
  //     }
  //   }
  //   if (allow) {
  //     const formData = new FormData();
  //     formData.set("img", details.img);
  //     formData.set("category", details.category);
  //     formData.set("description", details.description);
  //     formData.set("name", details.name);
  //     formData.set("price", details.price);
  //     formData.set("city", details.city);
  //     formData.set("created_by_user", "");
  //     history.push("/");
  //     UpdateData("listing/register", formData, "multipart/form-data")
  //       .then((result) => {
  //         if (result) {
  //           history.push("/");
  //         }
  //       })
  //       .catch((e) => console.log(e));
  //   }
  // };

  return (
    <div>
      {details ? (
        <RegisterAd loggedIn={true} details={details} edit={true} />
      ) : (
        ""
      )}
    </div>
  );
}
