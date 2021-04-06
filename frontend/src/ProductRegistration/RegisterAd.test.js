import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostPutData } from "../service/FetchData";
import RegisterAd from "./RegisterAd";
import { act } from "react-dom/test-utils";
import userEvent, { specialChars } from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./../reducers";
import { Provider } from "react-redux";

jest.mock("../service/FetchData", () => ({
  PostPutData: jest.fn(),
}));

let container, item, price, city, description, button, img, category;

beforeEach(() => {
  container = document.createElement("div");
  store.dispatch({
    type: "UPDATE_CATEGORY",
    payload: [{ category: "Annet" }],
  });
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <RegisterAd loggedIn={true} />
        </Router>
      </Provider>,
      container
    );
  });
  document.body.appendChild(container);

  item = container.querySelector("#item");
  userEvent.type(item, "kort");
  price = container.querySelector("#price");
  userEvent.type(price, "200");
  city = container.querySelector("#city");
  userEvent.type(city, "Oslo");
  category = container.querySelector("#category");
  userEvent.type(
    category,
    `Annet${specialChars.arrowDown}${specialChars.enter}`
  );
  description = container.querySelector("#description");
  userEvent.type(description, "et fint kort");

  button = container.querySelector("#submit");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("RegisterAd component", () => {
  // Tests if picture is uploaded
  test("upload", async () => {
    PostPutData.mockImplementation(() => Promise.resolve({ ok: "true" }));
    img = container.querySelector("#imgUpload");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await act(async () => {
      userEvent.upload(img, file);
    });
    await act(async () => {
      userEvent.click(button);
    });
    expect(PostPutData.mock.calls.length).toBe(1);
  });
  // Tests if all fields are filled, when registering an ad
  test("not all field filled in", () => {
    PostPutData.mockImplementation(() => Promise.resolve({ ok: "true" }));
    act(() => {
      userEvent.click(button);
    });
    expect(PostPutData.mock.calls.length).toBe(0);
  });
});
