import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { PostPutData, GetData } from "../../service/FetchData";
import { Provider } from "react-redux";
import store from "./../../reducers";
import EditUser from "../UserInfo/EditUser";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { toYoungError, toOldError } from "../errorMessages";
// import { RecordVoiceOverRounded } from "@material-ui/icons";
// import { CallReceived } from "@material-ui/icons";
// import { AirlineSeatLegroomNormal } from "@material-ui/icons";

jest.mock("../../service/FetchData", () => ({
  GetData: jest.fn(),
  PostPutData: jest.fn(),
}));

let container, firstName, lastName, tel, city, birthYear, button;

const profile = {
  user: { first_name: "Ole", last_name: "Oleson" },
  birth_year: "1998",
  phone: "99576480",
  city: "Oslo",
};

beforeEach(async () => {
  container = document.createElement("div");
  GetData.mockImplementation(() => Promise.resolve(profile));
  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <EditUser />
        </Router>
      </Provider>,
      container
    );
  });

  document.body.appendChild(container);

  firstName = container.querySelector("#firstName");
  userEvent.clear(firstName);
  userEvent.type(firstName, "Ola");

  lastName = container.querySelector("#lastName");
  userEvent.clear(lastName);
  userEvent.type(lastName, "Normann");

  tel = container.querySelector("#tel");
  userEvent.clear(tel);
  userEvent.type(tel, "90807060");

  city = container.querySelector("#city");
  userEvent.clear(city);
  userEvent.type(city, "Trondheim");

  birthYear = container.querySelector("#birthYear");

  button = container.querySelector("button");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("EditUser component", () => {
  test("will get userdata", async () => {
    const profiletxt = container.querySelector("#firstName");
    expect(profiletxt).toBeInTheDocument();
  });

  test("will say to to young", async () => {
    userEvent.clear(birthYear);
    userEvent.type(birthYear, (new Date().getFullYear() - 12).toString());
    act(() => {
      userEvent.click(button);
    });
    const errorText = screen.getByText(toYoungError);
    expect(errorText).toBeInTheDocument();
  });

  test("will say to to old", async () => {
    userEvent.clear(birthYear);
    userEvent.type(birthYear, "1899");
    act(() => {
      userEvent.click(button);
    });
    const errorText = screen.getByText(toOldError);
    expect(errorText).toBeInTheDocument();
  });

  test("will reject upload", async () => {
    PostPutData.mockImplementation(() => Promise.reject(new Error("401")));
    await act(async () => {
      userEvent.click(button);
    });
  });

  // use async and await in act when expecting component
  // to render with a promise inside
});
