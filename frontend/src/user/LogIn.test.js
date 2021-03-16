import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostPutData } from "../service/FetchData";
import LogIn from "./LogIn";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../service/FetchData", () => ({
  PostPutData: jest.fn(),
}));

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(
      <Router>
        <LogIn changeLoggedIn={(e) => true} loggedIn={false} />
      </Router>,
      container
    );
  });
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});
describe("Log in component", () => {
  it("will say wrong password - error", async () => {
    PostPutData.mockImplementation(() => Promise.reject(new Error("Error")));
    const email = container.querySelector('Input[type="email"]');
    email.value = "test@test.com";
    const password = container.querySelector('Input[type="password"]');
    password.value = "password";
    const button = container.querySelector("button");
    await act(async () => {
      userEvent.click(button);
    });
    const errorText = screen.getByText(/Feil brukernavn eller passord!/i);
    expect(errorText).toBeInTheDocument();
  });

  it("will not say wrong password", async () => {
    PostPutData.mockImplementation(() =>
      Promise.resolve({
        token: "bd2740afbafaf01ab80a4bd0eb7d776321b6bd98",
      })
    );
    const email = container.querySelector('Input[type="email"]');
    email.value = "test@test.com";
    const password = container.querySelector('Input[type="password"]');
    password.value = "password";
    const button = container.querySelector("button");
    await act(async () => {
      userEvent.click(button);
    });
    const errorText = screen.queryByText(/Feil brukernavn eller passord!/i);
    expect(errorText).not.toBeInTheDocument();
  });

  it("will say wrong password - wrong data", async () => {
    PostPutData.mockImplementation(() =>
      Promise.resolve({
        user: "wrong data",
      })
    );
    const email = container.querySelector('Input[type="email"]');
    email.value = "test@test.com";
    const password = container.querySelector('Input[type="password"]');
    password.value = "password";
    const button = container.querySelector("button");
    await act(async () => {
      userEvent.click(button);
    });
    const errorText = screen.queryByText(/Feil brukernavn eller passord!/i);
    expect(errorText).toBeInTheDocument();
  });
});
