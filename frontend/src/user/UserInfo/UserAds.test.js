import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { GetData } from "../../service/FetchData";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./../../reducers";
import { Provider } from "react-redux";
import UserAds from "./UserAds";

jest.mock("../../service/FetchData", () => ({
  GetData: jest.fn(),
}));

const products = [
  {
    id: 1,
    name: "stol",
    description: "lite brukt stol til god pris",
    price: 200,
    first_name: "Hans",
    last_name: "Pettersen",
    phone: 98765432,
    img:
      "https://www.if.no/magasinet/imageshop/img_shp_img_ymq7qsg42u-780x450.jpeg",
    sold: true,
  },
  {
    id: 2,
    name: "bord",
    description: "lite brukt bord til god pris",
    price: 900,
    first_name: "Kari",
    last_name: "Bakken",
    phone: 12345678,
    img:
      "https://www.if.no/magasinet/imageshop/img_shp_img_ymq7qsg42u-780x450.jpeg",
    sold: false,
  },
];

describe("UserAds component", () => {
  it("shows saved ads", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    GetData.mockImplementation(() => Promise.resolve(products));
    store.dispatch({
      type: "UPDATE_LOGGED_IN",
      payload: true,
    });
    await act(async () => {
      ReactDOM.render(
        <Provider store={store}>
          <Router>
            <UserAds />
          </Router>
        </Provider>,
        container
      );
    });
    const sold = screen.getAllByText("Solgt");
    expect(sold.length).toBe(2);
  });
});
