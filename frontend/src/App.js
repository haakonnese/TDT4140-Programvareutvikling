import Header from "./Header";
import React, { useState, useEffect } from "react";
import Registation from "./user/Registration";
import SignIn from "./user/LogIn";
import Products from "./marketplace/Products/Products";
import ProductInfo from "./marketplace/ProductInfo/ProductInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";
import RegisterAd from "./ProductRegistration/RegisterAd";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { GetData } from "./service/FetchData";

function reducer(state, action = "default") {
  switch (action.type) {
    case "update":
      return action.payload;
    default:
      return state;
  }
}
const store = createStore(reducer, {
  categories: [
    {
      category: "",
    },
  ],
});
function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
  function changeLoggedIn(value) {
    setLoggedIn(value);
  }
  useEffect(() => {
    GetData("listing/categories").then((data) => {
      if (data.length > 0) {
        store.dispatch({ type: "update", payload: { categories: data } });
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Header
          title="SellPoint"
          loggedIn={loggedIn}
          changeLoggedIn={changeLoggedIn}
        />
        <div className="App">
          <Switch>
            <Route
              exact
              path="/registrer"
              render={() => (
                <Registation
                  loggedIn={loggedIn}
                  changeLoggedIn={changeLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/logginn"
              render={() => (
                <SignIn loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} />
              )}
              // component={SignIn}
              // loggedIn={loggedIn}
              // changeLoggedIn={changeLoggedIn}
            />
            <Route
              exact
              path="/opprett"
              render={() => <RegisterAd loggedIn={loggedIn} />}
            />
            <Route exact path="/" component={Products}></Route>
            <Route exact path="/products/:id" component={ProductInfo} />
          </Switch>
        </div>
        <Footer title="SellPoint" description="" />
      </Router>
    </Provider>
  );
}

export default App;
