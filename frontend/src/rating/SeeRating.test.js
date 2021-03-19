import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { GetData } from "../service/FetchData";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import SeeRating from "./SeeRating";

jest.mock("../service/FetchData", () => ({
  GetData: jest.fn(),
}));

const rating = {
  first_name: "Kari",
  last_name: "Olsen",
  avg_rating: 9,
  ratings: [
    {
      first_name: "Ola",
      last_name: "Normann",
      user_id: 90807060,
      ad_id: 3,
      name: "Tittel",
      stars: 10,
      description: "Veldig bra handel",
    },
    {
      first_name: "Ola",
      last_name: "Norman",
      user_id: 90807060,
      ad_id: 1,
      name: "Tittel",
      stars: 9,
      description:
        "Veldig b handel. Den gikk helt kirkefritt, fantastisk, bra, likans og smertefritt, og varen kom frem slik det var sagt. Veldig fornøyd med denne handelen.",
    },
    {
      first_name: "Ola",
      last_name: "Norma",
      user_id: 90807060,
      ad_id: 2,
      name: "Tittel",
      stars: 8,
      description: "Veldig br handel",
    },
  ],
};

let container;
beforeEach(async () => {
  container = document.createElement("div");
  GetData.mockImplementation(() => Promise.resolve(rating));
  await act(async () => {
    ReactDOM.render(
      <Router>
        <SeeRating match={{ params: { userId: 1 } }} />
      </Router>,
      container
    );
  });
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("SeeRating component", () => {
  // use async and await in act when expecting component
  // to render with a promise inside
  it("displays correct user name", () => {
    const name = screen.getByText("Kari Olsen");
    expect(name).toBeInTheDocument();
  });

  it("displays the correct number of ratings", () => {
    const ratings = container.querySelector("#rating");
    expect(ratings.childElementCount).toBe(3);
  });
});
