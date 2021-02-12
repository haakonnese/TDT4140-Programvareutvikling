import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostData } from "../service/PostData";
import LogIn from "./LogIn";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

jest.mock("../service/PostData", () => ({
  PostData: jest.fn(),
}));

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});
describe("Log in component", () => {
  it("will say wrong password", async () => {
    act(() => {
      ReactDOM.render(<LogIn />, container);
    });
    PostData.mockImplementation(() => Promise.reject(new Error("Error")));
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
    act(() => {
      ReactDOM.render(<LogIn />, container);
    });
    PostData.mockImplementation(() =>
      Promise.resolve({
        userData: { email: "test@test.com", password: "test" },
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
});
