import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostData } from "../service/PostData";
import Registration from "./Registration";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import {
  emailError,
  passwordError,
  toYoungError,
  toOldError,
} from "./errorMessages";

jest.mock("../service/PostData", () => ({
  PostData: jest.fn(),
}));

let container,
  firstName,
  lastName,
  email,
  tel,
  city,
  birthYear,
  password,
  password2,
  button;

beforeEach(async () => {
  container = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <Router>
        <Registration />
      </Router>,
      container
    );
  });
  document.body.appendChild(container);

  firstName = container.querySelector("#firstName");
  userEvent.type(firstName, "Ola");

  lastName = container.querySelector("#lastName");
  userEvent.type(lastName, "Normann");

  email = container.querySelector("#email");
  userEvent.type(email, "ola@normann.no");

  tel = container.querySelector("#tel");
  userEvent.type(tel, "90807060");

  city = container.querySelector("#city");
  userEvent.type(city, "Trondheim");

  birthYear = container.querySelector("#birthYear");
  userEvent.type(birthYear, "2000");

  password = container.querySelector("#password");
  userEvent.type(password, "password");

  password2 = container.querySelector("#password2");
  userEvent.type(password2, "password");

  button = container.querySelector("button");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Registration component", () => {
  it("will say to wrong password", () => {
    userEvent.clear(password2);
    userEvent.type(password2, "wrongPassword");
    act(() => {
      userEvent.click(button);
    });
    const errorText = screen.getByText(passwordError);
    expect(errorText).toBeInTheDocument();
  });

  it("will say to to young", () => {
    userEvent.clear(birthYear);
    userEvent.type(birthYear, (new Date().getFullYear() - 12).toString());
    act(() => {
      userEvent.click(button);
    });
    const errorText = screen.getByText(toYoungError);
    expect(errorText).toBeInTheDocument();
  });

  it("will say to to old", () => {
    userEvent.clear(birthYear);
    userEvent.type(birthYear, "1899");
    act(() => {
      userEvent.click(button);
    });
    const errorText = screen.getByText(toOldError);
    expect(errorText).toBeInTheDocument();
  });

  // use async and await in act when expecting component
  // to render with a promise inside
  it("will say email does not exist", async () => {
    PostData.mockImplementation(() => Promise.reject(new Error("Email")));
    await act(async () => {
      userEvent.click(button);
    });
    const errorText = screen.getByText(emailError);
    expect(errorText).toBeInTheDocument();
  });
});
