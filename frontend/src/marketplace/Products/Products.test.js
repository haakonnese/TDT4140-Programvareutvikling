import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostPutData } from "../../service/FetchData";
import { act } from "react-dom/test-utils";
import Products from "./Products";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./../../reducers";
import { Provider } from "react-redux";

jest.mock("../../service/FetchData", () => ({
  PostPutData: jest.fn(),
}));

const products = {
  num_pages: 1,
  products: [
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
    },
  ],
};

describe("Products component", () => {
  // use async and await in act when expecting component
  // to render with a promise inside
  test("if prices is correct", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    PostPutData.mockImplementation(() => Promise.resolve(products));
    store.dispatch({
      type: "UPDATE_CATEGORY",
      payload: [{ category: "Annet" }],
    });
    await act(async () => {
      ReactDOM.render(
        <Provider store={store}>
          <Router>
            <Products />
          </Router>
        </Provider>,
        container
      );
    });
    //   console.log(container)

    const price1 = screen.getByText("200kr");
    const price2 = screen.getByText("900kr");
    expect(price1).toBeInTheDocument();
    expect(price2).toBeInTheDocument();
  });
});
