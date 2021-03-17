import React, { useState, useEffect } from "react";
import { GetData, PostData } from "../service/FetchData";
import PropTypes from "prop-types";
import {
  Container,
  CssBaseline,
  Typography,
  Avatar,
  Box,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import InputTextField from "../standardComponents/InputTextField";
import useStyles from "../standardComponents/styles";
import PostAdd from "@material-ui/icons/PostAdd";
import { Link } from "react-router-dom";

function GiveRating({ match }) {
  const classes = useStyles();
  const [details, setDetails] = useState({ id: match.params.id });
  const [product, setProduct] = useState(false);
  const [rated, setRated] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    GetData("listing/listing", match.params.id).then((result) => {
      setProduct(result);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    if (
      !(
        details.description == null ||
        details.stars == null ||
        details.stars < 1 ||
        details.stars > 10 ||
        details.id == null
      )
    ) {
      PostData("rating/register", details)
        .then((result) => {
          if (result) {
            setRated(true);
          }
        })
        .catch(() => setError(true));
    } else {
      setEmpty(true);
    }
  };
  return (
    <Container>
      {product && product.rating == null ? (
        <div>
          {!rated ? (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <PostAdd />
                </Avatar>
                <Box borderColor="transparent" mb={3}>
                  <Typography component="h1" variant="h5">
                    Gi tilbakemelding
                  </Typography>
                </Box>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Box component="fieldset" borderColor="transparent">
                    <Typography component="legend">
                      Hvor bra gikk kjøpet
                    </Typography>
                    <Rating
                      size="large"
                      name="customized-10"
                      onChange={(event, newValue) => {
                        setDetails({ ...details, stars: newValue });
                        setEmpty(false);
                      }}
                      max={10}
                    />
                    {empty ? (
                      <FormHelperText error>
                        Antall stjerner må fylles inn
                      </FormHelperText>
                    ) : null}
                  </Box>
                  <InputTextField
                    isRequired
                    value="description"
                    type="textfield"
                    id="description"
                    label="Beskriv din opplevelse med kjøpet."
                    multiline={true}
                    val={details.description}
                    details={details}
                    setDetails={setDetails}
                  />
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
                  {error ? (
                    <FormHelperText component="div" error>
                      <Typography>
                        Det skjedde en feil med registreringen
                      </Typography>
                    </FormHelperText>
                  ) : null}
                </form>
              </div>
            </Container>
          ) : (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <PostAdd />
                </Avatar>
                <Box borderColor="transparent" mb={3}>
                  <Typography component="h1" variant="h5">
                    Takk for tilbakemeldingen
                  </Typography>
                </Box>
                <Link to="/">
                  <Button>Tilbake til forsiden</Button>
                </Link>
              </div>
            </Container>
          )}
        </div>
      ) : (
        <div>Kan ikke gi tilbakemelding</div>
      )}
    </Container>
  );
}

GiveRating.propTypes = {
  match: PropTypes.object.isRequired,
};
export default GiveRating;
