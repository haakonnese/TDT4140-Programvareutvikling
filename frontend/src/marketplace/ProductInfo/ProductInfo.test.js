import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { GetData } from "../../service/FetchData";
import { act } from "react-dom/test-utils";
import ProductInfo from "./ProductInfo";
import { Provider } from "react-redux";
import store from "./../../reducers";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../service/FetchData", () => ({
  GetData: jest.fn(),
}));

const products = {
  id: 1,
  name: "stol",
  description: "lite brukt stol til god pris",
  price: 200,
  firstName: "Hans",
  lastName: "Pettersen",
  sellerTlf: 98765432,
};

describe("ProductInfo component", () => {
  // use async and await in act when expecting component
  // to render with a promise inside
  test("if price is correct", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    GetData.mockImplementation(() => Promise.resolve(products));
    await act(async () => {
      ReactDOM.render(
        <Provider store={store}>
          <Router>
            <ProductInfo match={{ params: { id: 1 } }} />
          </Router>
        </Provider>,
        container
      );
    });
    //   console.log(container)

    const errorText = screen.getByText("200kr");
    expect(errorText).toBeInTheDocument();
  });
});
