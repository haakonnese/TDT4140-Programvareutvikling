import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostData } from "./PostData";
import Ad from "./Ad";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("./PostData", () => ({
  PostData: jest.fn(),
}));

let container, item, phone, city, description, image, button;

beforeEach(async () => {
  container = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <Router>
        <Ad />
      </Router>,
      container
    );
  });
  document.body.appendChild(container);

  item = container.querySelector("#item");
  userEvent.type(item, "kort");

  phone = container.querySelector("#phone");
  userEvent.type(phone, "99576480");
  city = container.querySelector("#city");
  userEvent.type(city, "Oslo");
  description = container.querySelector("#description");
  userEvent.type(description, "et fint kort");
  phone = container.querySelector("#image");
  userEvent.type(image, "");

  button = container.querySelector("button");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Ad component", () => {
  it("will say opload succeeded", () => {
    PostData.mockImplementation(() => Promise.resolve({ ok: "true" }));

    act(() => {
      userEvent.click(button);
    });
  });
});
