import { React, useState, useEffect } from "react";
import { GetData } from "../../service/FetchData";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import RegisterAd from "../../ProductRegistration/RegisterAd";
import { connect } from "react-redux";

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

function EditAd({ match }) {
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
const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(EditAd);
