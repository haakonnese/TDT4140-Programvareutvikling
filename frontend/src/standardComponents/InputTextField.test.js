import { render, screen } from "@testing-library/react";
import InputTextField from "./InputTextField";

function setDetails() {
  return true;
}
test("check if inputfield has focus", () => {
  render(
    <InputTextField
      value="first_name"
      type="textfield"
      id="first_name"
      label="Fornavn"
      autoComplete="given-name"
      details={{
        first_name: "",
        last_name: "",
        phone: "",
        city: "",
        birth_year: "",
        email: "",
        password: "",
      }}
      setDetails={setDetails}
      autoFocus
    />
  );
  const inputText = screen.getByLabelText(/Fornavn/i);
  expect(document.activeElement).toBe(inputText);
});
