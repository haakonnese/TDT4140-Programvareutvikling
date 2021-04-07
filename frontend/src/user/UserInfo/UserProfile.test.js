import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "./../../reducers";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import { GetData } from "../../service/FetchData";
import UserProfile from "./UserProfile";

jest.mock("../../service/FetchData", () => ({
  GetData: jest.fn(),
}));

let container;

const profile = {
  user: {
    first_name: "Ole",
    last_name: "Oleson",
    user: "ole.oleson@gmail.com",
  },
  phone: "99576480",
  city: "Oslo",
};
beforeEach(async () => {
  store.dispatch({
    type: "UPDATE_LOGGED_IN",
    payload: true,
  });
  container = document.createElement("div");
  GetData.mockImplementation(() => Promise.resolve(profile));
  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <UserProfile />
        </Router>
      </Provider>,
      container
    );
  });

  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("UserProfile component", () => {
  test("get userdata", async () => {
    const profiletxt = screen.getByText("Ole Oleson");
    expect(profiletxt).toBeInTheDocument();
  });

  test("will say to to young", async () => {
    const editInfoButton = screen.getByText("Rediger info");
    expect(editInfoButton).toBeInTheDocument();
  });
});
