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

let container, item, phone, city, description, button;

beforeEach(() => {
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

  phone = container.querySelector("#tel");
  userEvent.type(phone, "99576480");
  city = container.querySelector("#city");
  userEvent.type(city, "Oslo");
  description = container.querySelector("#description");
  userEvent.type(description, "et fint kort");
  button = container.querySelector("button");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Ad component", () => {
  test("upload", async () => {
    PostData.mockImplementation(() => Promise.resolve({ ok: "true" }));

    await act(async () => {
      userEvent.click(button);
    });
    expect(PostData.mock.calls.length).toBe(1);
  });
});
