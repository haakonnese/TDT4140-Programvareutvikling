import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostPutData, GetData } from "../../service/FetchData";

import EditAd from "../../user/UserInfo/EditAD";
import { act } from "react-dom/test-utils";
import userEvent, { specialChars } from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./../../reducers";

jest.mock("../../service/FetchData", () => ({
  GetData: jest.fn(),
  PostPutData: jest.fn(),
}));

let container, item, price, city, description, button, category, img;

const Ad = {
  id: 1,
  name: "stol",
  description: "lite brukt stol til god pris",
  price: 200,
  city: "Trondheim",
  category: "Kjøretøy",
  img:
    "https://www.if.no/magasinet/imageshop/img_shp_img_ymq7qsg42u-780x450.jpeg",
};

beforeEach(async () => {
  container = document.createElement("div");
  store.dispatch({
    type: "UPDATE_CATEGORY",
    payload: [{ category: "Annet" }, { category: "Kjøretøy" }],
  });
  container = document.createElement("div");
  GetData.mockImplementation(() => Promise.resolve(Ad));
  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <EditAd match={{ params: { id: 1 } }} />
        </Router>
      </Provider>,
      container
    );
  });

  document.body.appendChild(container);
  item = container.querySelector("#item");
  userEvent.clear(item);
  userEvent.type(item, "kort");
  price = container.querySelector("#price");
  userEvent.clear(price);
  userEvent.type(price, "200");
  city = container.querySelector("#city");
  userEvent.clear(city);
  userEvent.type(city, "Oslo");
  category = container.querySelector("#category");
  userEvent.clear(category);
  userEvent.type(
    category,
    `Annet${specialChars.arrowDown}${specialChars.enter}`
  );
  description = container.querySelector("#description");
  userEvent.clear(description);
  userEvent.type(description, "et fint kort");
  button = container.querySelector("#submit");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("EditAd component", () => {
  test("upload image", async () => {
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
  test("not all field filled in", () => {
    PostPutData.mockImplementation(() => Promise.resolve({ ok: "true" }));
    userEvent.clear(description);
    act(() => {
      userEvent.click(button);
    });
    expect(PostPutData.mock.calls.length).toBe(0);
  });
});
