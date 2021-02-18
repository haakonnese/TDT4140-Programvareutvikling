import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

// define which type the input field will be
InputTextField.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  displayHelper: PropTypes.string,
  autoComplete: PropTypes.string,
  setDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  errorType: PropTypes.string,
  val: PropTypes.string,
  user: PropTypes.bool,
};

export default function InputTextField(props) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      value={props.val}
      onChange={(e) => {
        if (props.user) {
          props.setDetails({
            ...props.details,
            user: { ...props.details.user, [props.value]: e.target.value },
          });
        } else {
          props.setDetails({ ...props.details, [props.value]: e.target.value });
        }
      }}
      type={props.type}
      id={props.id}
      label={props.label}
      name={props.id}
      error={props.errorType === props.type}
      helperText={props.errorType === props.type ? props.displayHelper : ""}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
    />
  );
}
