import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostData, DeleteData } from "../service/FetchData";
import { act } from "react-dom/test-utils";
import HeartButton from "./HeartButton";
import userEvent from "@testing-library/user-event";

jest.mock("../service/FetchData", () => ({
  PostData: jest.fn(),
  DeleteData: jest.fn(),
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
    favorite: false,
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
    favorite: true,
  },
];

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("HearButton component", () => {
  // use async and await in act when expecting component
  // to render with a promise inside
  test("remove favorite", async () => {
    PostData.mockImplementation(() => Promise.resolve());
    DeleteData.mockImplementation(() => Promise.resolve());
    act(() => {
      ReactDOM.render(<HeartButton product={products[1]} />, container);
    });
    //   console.log(container)
    const favorite = screen.getByLabelText("Favoriser");
    expect(favorite).toBeInTheDocument();
    await act(async () => {
      userEvent.click(favorite);
    });
    expect(PostData.mock.calls.length).toBe(0);
    expect(DeleteData.mock.calls.length).toBe(1);
  });

  test("add favorite", async () => {
    PostData.mockImplementation(() => Promise.resolve());
    DeleteData.mockImplementation(() => Promise.resolve());
    act(() => {
      ReactDOM.render(<HeartButton product={products[0]} />, container);
    });
    const favorite = screen.getByLabelText("Favoriser");
    expect(favorite).toBeInTheDocument();
    await act(async () => {
      userEvent.click(favorite);
    });
    expect(PostData.mock.calls.length).toBe(1);
    expect(DeleteData.mock.calls.length).toBe(0);
  });
});
