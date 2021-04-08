import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostPutData, GetData } from "../../service/FetchData";
import EditAd from "../../user/UserInfo/EditAd";
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
  category: "Kjøretøy",
  city: "Trondheim",
  created_by_user: 2,
  description:
    "2 år gammel subaru. Har gått 50 000km, selges grunnet flytting.",
  favorite: false,
  first_name: "Jostein",
  id: 4,
  img:
    "http://127.0.0.1:8000/media/product/4WD-kampanje_Aleksander_R%C3%B8rnes_BiN-61.jpg_1017x678.jpg",
  last_name: "Tandberg",
  name: "Subaru",
  phone: "9999998",
  price: "100000000",
  rating: null,
  sold: true,
  sold_date: "2021-04-07T11:38:08.547451Z",
};

beforeEach(async () => {
  container = document.createElement("div");
  store.dispatch({
    type: "UPDATE_CATEGORY",
    payload: [{ category: "Annet" }, { category: "Kjøretøy" }],
  });
  store.dispatch({
    type: "UPDATE_LOGGED_IN",
    payload: true,
  });
  localStorage.setItem("userId", "2");
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
