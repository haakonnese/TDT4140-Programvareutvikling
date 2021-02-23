import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostData } from "../service/PostData";
import RegisterAd from "./RegisterAd";
import { act } from "react-dom/test-utils";
import userEvent, { specialChars } from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../service/PostData", () => ({
  PostData: jest.fn(),
}));

let container, item, price, city, description, button, img, category;

beforeEach(() => {
  container = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <Router>
        <RegisterAd loggedIn={true} />
      </Router>,
      container
    );
  });
  document.body.appendChild(container);

  item = container.querySelector("#item");
  userEvent.type(item, "kort");
  price = container.querySelector("#price");
  userEvent.type(price, "200");
  city = container.querySelector("#city");
  userEvent.type(city, "Oslo");
  category = container.querySelector("#category");
  userEvent.type(
    category,
    `Annet${specialChars.arrowDown}${specialChars.enter}`
  );
  description = container.querySelector("#description");
  userEvent.type(description, "et fint kort");

  button = container.querySelector("#submit");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("RegisterAd component", () => {
  test("upload", async () => {
    PostData.mockImplementation(() => Promise.resolve({ ok: "true" }));
    img = container.querySelector("#imgUpload");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await act(async () => {
      userEvent.upload(img, file);
    });
    await act(async () => {
      userEvent.click(button);
    });
    expect(PostData.mock.calls.length).toBe(1);
  });
  test("not all field filled in", () => {
    PostData.mockImplementation(() => Promise.resolve({ ok: "true" }));
    act(() => {
      userEvent.click(button);
    });
    expect(PostData.mock.calls.length).toBe(0);
  });
});
