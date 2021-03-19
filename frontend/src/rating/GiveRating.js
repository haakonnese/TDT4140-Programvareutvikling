import React, { useState, useEffect } from "react";
import { GetData, PostData } from "../service/FetchData";
import PropTypes from "prop-types";
import {
  Container,
  CssBaseline,
  Typography,
  Box,
  Button,
  FormHelperText,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import InputTextField from "../standardComponents/InputTextField";
import useStyles from "../standardComponents/styles";
import { Link, useHistory } from "react-router-dom";

function GiveRating(props) {
  const classes = useStyles();
  const [details, setDetails] = useState({ id: props.match.params.id });
  const [product, setProduct] = useState(false);
  const [rated, setRated] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const history = useHistory();
  if (!props.loggedIn) {
    history.replace("/logginn");
  }
  useEffect(() => {
    GetData("listing/listing", props.match.params.id).then((result) => {
      result.img = "http://127.0.0.1:8000" + result.img;
      setProduct(result);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
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
      <CssBaseline />
      {!product ? null : (
        <div>
          {product.rating == null ? (
            <div>
              <Container component="main" maxWidth="xs">
                <Card style={{ marginTop: 30, width: "100%" }}>
                  <CardContent>
                    <Typography gutterBottom>{product.name}</Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography gutterBottom color="textSecondary">
                        {product.first_name} {product.last_name}
                      </Typography>
                      <Typography gutterBottom color="textSecondary">
                        {product.price}kr
                      </Typography>
                    </div>
                  </CardContent>
                  <CardMedia
                    style={{ height: 0, paddingTop: "56.25%", width: "100%" }}
                    image={product.img}
                  />
                </Card>
                {!rated ? (
                  <div className={classes.paper}>
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
                          id="stars"
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
                ) : (
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
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
              </Container>
            </div>
          ) : (
            <div>Kan ikke gi tilbakemelding</div>
          )}
        </div>
      )}
    </Container>
  );
}

GiveRating.propTypes = {
  match: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
export default GiveRating;
