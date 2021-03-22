import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import { GetData} from "../../service/FetchData";
import { PostPutData} from "../../service/FetchData";

import EditUser from "../UserInfo/EditUser";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import {
  emailError,
  passwordError,
  toYoungError,
  toOldError,
} from "../errorMessages";

jest.mock("../../service/FetchData", () => ({
  GetData: jest.fn(),
  PostPutData: jest.fn(),
}));





let container,
  firstName,
  lastName,
  tel,
  city,
  birthYear,
  
  button;

const profile = 
  {
    user: { first_name: "Ole", last_name: "Oleson" },
    birth_year: "1998",
    phone: "99576480",
    city: "Oslo",
  
  
  }
    
  ;


// describe("Products component", () => {
//   // use async and await in act when expecting component
//   // to render with a promise inside
//   test("if userinfo firstname is correct", async () => {
//     const container = document.createElement("div");
//     document.body.appendChild(container);
    
//     GetData.mockImplementation(() => Promise.resolve(profile));
//     await act(async () => {
//       ReactDOM.render(
//         <Router>
//           <EditUser />
//         </Router>,
//         container
//       );
//     });
//     const profiletxt = container.querySelector(
//      "#firstName"
//      );
     
//      console.log(profiletxt.value)
//     expect(profiletxt).toBeInTheDocument();
    

   
//   });
// });

beforeEach(async () => {
  container = document.createElement("div");
  GetData.mockImplementation(() => Promise.resolve(profile));
  act(() => {
    ReactDOM.render(
      <Router>
        <EditUser />
      </Router>,
      container
    );
  });

  document.body.appendChild(container);

  firstName = container.querySelector("#firstName");
  userEvent.type(firstName, "Ola");

  lastName = container.querySelector("#lastName");
  userEvent.type(lastName, "Normann");

  
  tel = container.querySelector("#tel");
  userEvent.type(tel, "90807060");

  city = container.querySelector("#city");
  userEvent.type(city, "Trondheim");

  birthYear = container.querySelector("#birthYear");
  userEvent.type(birthYear, "");

  

  button = container.querySelector("button");
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});
  


describe("Registration component", () => {

  it("will get userdata", () => {

    const profiletxt = container.querySelector(
      "#firstName");
           
    console.log(profiletxt.value)
     expect(profiletxt).toBeInTheDocument();
    
    
    
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

  it("will say no Data", async () => {
    PostPutData.mockImplementation(() => Promise.reject({birthyear: ""}));
    await act(async () => {
      userEvent.click(button);
    });
    
  });

  // use async and await in act when expecting component
  // to render with a promise inside
  
 
});