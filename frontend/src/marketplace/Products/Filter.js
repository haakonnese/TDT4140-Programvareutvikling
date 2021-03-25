import { React, useState, useEffect } from "react";
import { Button, Grid, TextField, FormHelperText } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store, { filter } from "./../../reducers";
import { priceError } from "./errorMessages";

function Filter(props) {
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const [details, setDetails] = useState(filter);

  useEffect(() => {
    search();
  }, [details.category]);

  function search() {
    if (
      Number.isInteger(details.min) &&
      Number.isInteger(details.max) &&
      details.max < details.min
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
              id="min"
              type="number"
              label="Fra kr"
              error={error.error}
              fullWidth
              onChange={(e) => {
                if (e.target.value < 0) {
                  setDetails({ ...details, min: 0 });
                } else if (e.target.value !== "") {
                  setDetails({ ...details, min: parseInt(e.target.value) });
                } else {
                  setDetails({ ...details, min: false });
                }
              }}
              value={Number.isInteger(details.min) ? details.min : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              id="max"
              label="Til kr"
              error={error.error}
              fullWidth
              onChange={(e) => {
                if (e.target.value < 0) {
                  setDetails({ ...details, max: 0 });
                } else if (e.target.value !== "") {
                  setDetails({ ...details, max: parseInt(e.target.value) });
                } else {
                  setDetails({ ...details, max: false });
                }
              }}
              value={Number.isInteger(details.max) ? details.max : ""}
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
                if (e.target.value === "") {
                  setDetails({ ...details, city: null });
                } else {
                  setDetails({ ...details, city: e.target.value });
                }
              }}
              value={details.city == null ? "" : details.city}
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
            noOptionsText="Kategori ikke funnet"
            options={props.categories.map((option) => option.category)}
            onChange={(e, value) => {
              if (value === "") {
                setDetails({ ...details, category: null });
              } else {
                setDetails({ ...details, category: value });
              }
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
