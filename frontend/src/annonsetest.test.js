import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostData } from "./PostData";
import Annonse from "./annonse";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("./PostData", () => ({
  PostData: jest.fn(),
}));

let container, vare, phone, city, beskrivelse, button;

beforeEach(async () => {
  container = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <Router>
        <Annonse />
      </Router>,
      container
    );
  });
  document.body.appendChild(container);

  vare = container.querySelector("#vare");
  userEvent.type(tel, "kort");

  phone = container.querySelector("#tel");
  userEvent.type(tel, "99576480");

  city = container.querySelector("#city");
  userEvent.type(city, "Trondheim");
  beskrivelse = container.querySelector("#beskrivelse");
  userEvent.type(tel, "Et kort");

  button = container.querySelector("button");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const annonse = [
  {
    vare: "kort",
    phone: "99576480",
    city: "Oslo",
    beskrivelse: "et kort",
  },
];

describe("Products component", () => {
  // use async and await in act when expecting component
  // to render with a promise inside
  test("if prices is correct", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    PostData.mockImplementation(() => Promise.resolve(annonse));
    await act(async () => {
      ReactDOM.render(
        <Router>
          <Annonse />
        </Router>,
        container
      );
    });

    vare = container.querySelector("#vare");
    //userEvent.type(vare, "kort");
    //act(() => {
    //  userEvent.click(button);
    //});
    //   console.log(container)

    const price1 = screen.getByText("kort");

    expect(price1).toBeInTheDocument();
  });
});
