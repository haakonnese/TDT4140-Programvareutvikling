import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostData } from "../service/PostData";
import { act } from "react-dom/test-utils";
import Products from "./Products";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../service/PostData", () => ({
  PostData: jest.fn(),
}));

const products = [
  {
    id: 1,
    name: "stol",
    description: "lite brukt stol til god pris",
    price: 200,
    firstName: "Hans",
    lastName: "Pettersen",
    sellerTlf: 98765432,
    imgUrl:
      "https://www.if.no/magasinet/imageshop/img_shp_img_ymq7qsg42u-780x450.jpeg",
  },
  {
    id: 2,
    name: "bord",
    description: "lite brukt bord til god pris",
    price: 900,
    firstName: "Kari",
    lastName: "Bakken",
    sellerTlf: 12345678,
    imgUrl:
      "https://www.if.no/magasinet/imageshop/img_shp_img_ymq7qsg42u-780x450.jpeg",
  },
];

describe("Products component", () => {
  // use async and await in act when expecting component
  // to render with a promise inside
  test("if prices is correct", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    PostData.mockImplementation(() => Promise.resolve(products));
    await act(async () => {
      ReactDOM.render(
        <Router>
          <Products />
        </Router>,
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
