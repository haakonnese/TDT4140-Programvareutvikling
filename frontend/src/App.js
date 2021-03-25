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
import UserAds from "./user/UserInfo/UserAds";
import UserProfile from "./user/UserInfo/UserProfile";
import EditUser from "./user/UserInfo/EditUser";
import EditAd from "./user/UserInfo/EditAd";
import { Provider } from "react-redux";
import { GetData } from "./service/FetchData";
import GiveRating from "./rating/GiveRating";
import store from "./reducers";
import EditPassword from "./user/UserInfo/EditPassword";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
  function changeLoggedIn(value) {
    setLoggedIn(value);
  }
  useEffect(() => {
    GetData("listing/categories").then((data) => {
      store.dispatch({
        type: "UPDATE_CATEGORY",
        payload: data,
      });
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
            <Route
              exact
              path="/brukerannonser"
              render={() => <UserAds loggedIn={loggedIn} />}
            />
            <Route
              exact
              path="/brukerprofil"
              render={() => <UserProfile loggedIn={loggedIn} />}
            />
            <Route
              exact
              path="/profilredigering"
              render={() => <EditUser loggedIn={loggedIn} />}
            />
            <Route
              exact
              path="/passordredigering"
              render={() => <EditPassword loggedIn={loggedIn} />}
            />
            <Route exact path="/endreannonse/:id" component={EditAd} />
            <Route exact path="/" component={Products}></Route>
            <Route
              exact
              path="/products/:id"
              render={({ match }) => (
                <ProductInfo loggedIn={loggedIn} match={match} />
              )}
            />
            <Route
              exact
              path="/rating/:id"
              render={({ match }) => (
                <GiveRating loggedIn={loggedIn} match={match} />
              )}
            />
          </Switch>
        </div>
        <Footer title="SellPoint" description="" />
      </Router>
    </Provider>
  );
}

export default App;
