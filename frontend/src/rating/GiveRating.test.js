import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { GetData, PostPutData } from "../service/FetchData";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import GiveRating from "./GiveRating";

jest.mock("../service/FetchData", () => ({
  GetData: jest.fn(),
  PostPutData: jest.fn(),
}));

let products, container, description, button, stars;
beforeEach(async () => {
  container = document.createElement("div");
  products = {
    id: 1,
    name: "stol",
    description: "lite brukt stol til god pris",
    price: 200,
    firstName: "Hans",
    lastName: "Pettersen",
    sellerTlf: 98765432,
    rating: null,
  };
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("GiveRating component", () => {
  // use async and await in act when expecting component
  // to render with a promise inside
  test("if title is correct", async () => {
    GetData.mockImplementation(() => Promise.resolve(products));
    await act(async () => {
      ReactDOM.render(
        <Router>
          <GiveRating match={{ params: { id: 1 } }} loggedIn={true} />
        </Router>,
        container
      );
    });
    document.body.appendChild(container);
    const title = screen.getByText("stol");
    expect(title).toBeInTheDocument();
  });

  it("displays cannot give rating", async () => {
    products.rating = 3;
    GetData.mockImplementation(() => Promise.resolve(products));
    await act(async () => {
      ReactDOM.render(
        <Router>
          <GiveRating match={{ params: { id: 1 } }} loggedIn={true} />
        </Router>,
        container
      );
    });
    document.body.appendChild(container);
    const errorText = screen.getByText(
      "Det er allerede gitt tilbakemelding på denne annonsen"
    );
    expect(errorText).toBeInTheDocument();
  });

  it("displays link to front page", async () => {
    GetData.mockImplementation(() => Promise.resolve(products));
    await act(async () => {
      ReactDOM.render(
        <Router>
          <GiveRating match={{ params: { id: 1 } }} loggedIn={true} />
        </Router>,
        container
      );
    });
    document.body.appendChild(container);

    PostPutData.mockImplementation(() => Promise.resolve({ id: 1 }));
    stars = container.querySelector("#customized-10-9");
    userEvent.click(stars);
    description = container.querySelector("#description");
    userEvent.type(description, "En bra handel. Veldig fornøyd");
    button = container.querySelector("#submit");
    await act(async () => {
      userEvent.click(button);
    });
    const errorText = screen.getByText("Tilbake til forsiden");
    expect(errorText).toBeInTheDocument();
  });
});
