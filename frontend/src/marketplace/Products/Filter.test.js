import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";
import store from "./../../reducers";
import { Provider } from "react-redux";
import { priceError } from "./errorMessages";
import { screen } from "@testing-library/react";

let container, minimum, maximum, city, button;
beforeEach(() => {
  container = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Filter />
      </Provider>,
      container
    );
  });
  document.body.appendChild(container);

  minimum = container.querySelector("#minimum");
  userEvent.type(minimum, "120");
  maximum = container.querySelector("#maximum");
  userEvent.type(maximum, "200");
  city = container.querySelector("#city");
  userEvent.type(city, "Oslo");

  button = container.querySelector("#searchPrice");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Filter component", () => {
  test("Price not valid", async () => {
    userEvent.clear(minimum);
    userEvent.type(minimum, "1899");
    act(() => {
      userEvent.click(button);
    });
    const error = screen.getByText(priceError);
    expect(error).toBeInTheDocument();
  });
  test("Price valid", () => {
    act(() => {
      userEvent.click(button);
    });
    const error = screen.queryByText(priceError);
    expect(error).not.toBeInTheDocument();
  });
});
