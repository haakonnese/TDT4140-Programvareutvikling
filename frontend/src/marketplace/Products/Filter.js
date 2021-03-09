import { React, useState } from "react";
import { Button, Grid, TextField, FormHelperText } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store, { filter } from "./../../reducers";
import { priceError } from "./errorMessages";

function Filter(props) {
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const [details, setDetails] = useState(filter);

  function search() {
    if (
      details.minimum &&
      details.maximum &&
      details.maximum < details.minimum
    ) {
      setError({ error: true, errorMessage: priceError });
    } else {
      setError({ error: false, errorMessage: "" });
      store.dispatch({
        type: "UPDATE_FILTER",
        payload: details,
      });
    }
  }
  return (
    <Grid
      container
      justify="flex-start"
      spacing={4}
      style={{
        width: "100%",
        margin: 0,
        marginTop: 20,
      }}
    >
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              id="minimum"
              type="number"
              label="Fra kr"
              error={error.error}
              fullWidth
              onChange={(e) => {
                if (e.target.value < 0) {
                  setDetails({ ...details, minimum: 0 });
                } else if (e.target.value !== "") {
                  setDetails({ ...details, minimum: parseInt(e.target.value) });
                } else {
                  setDetails({ ...details, minimum: false });
                }
              }}
              value={details.minimum}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              id="maximum"
              label="Til kr"
              error={error.error}
              fullWidth
              onChange={(e) => {
                if (e.target.value < 0) {
                  setDetails({ ...details, maximum: 0 });
                } else if (e.target.value !== "") {
                  setDetails({ ...details, maximum: parseInt(e.target.value) });
                } else {
                  setDetails({ ...details, maximum: false });
                }
              }}
              value={details.maximum}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormHelperText
            id="errorPrice"
            disabled={!error.error}
            error={error.error}
          >
            {error.errorMessage}
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            id="searchPrice"
            color="primary"
            size="large"
            style={{ width: "100%" }}
            onClick={search}
          >
            Søk
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          spacing={1}
        >
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              id="city"
              label="By"
              fullWidth
              onChange={(e) => {
                setDetails({ ...details, city: e.target.value });
              }}
              value={details.city}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              margin="normal"
              id="searchCity"
              size="large"
              style={{ width: "100%" }}
              onClick={search}
            >
              Søk
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <Autocomplete
            id="category"
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
                margin="none"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
Filter.propTypes = {
  categories: PropTypes.array,
};

const mapStateToProps = (state) => {
  return { categories: state.categories };
};
export default connect(mapStateToProps)(Filter);
