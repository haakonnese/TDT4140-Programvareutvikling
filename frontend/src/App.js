import Header from "./Header";
import React, { useEffect } from "react";
import Registation from "./user/Registration";
import SignIn from "./user/LogIn";
import Products from "./marketplace/Products/Products";
import ProductInfo from "./marketplace/ProductInfo/ProductInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";
import RegisterAd from "./ProductRegistration/RegisterAd";
import "./index.css";
import { Provider } from "react-redux";
import { GetData } from "./service/FetchData";
import store from "./reducers";
import UserProfile from "./user/UserInfo/UserProfile";
import EditUser from "./user/UserInfo/EditUser";
import EditPassword from "./user/UserInfo/EditPassword";

function App() {
  useEffect(() => {
    store.dispatch({
      type: "UPDATE_LOGGED_IN",
      payload: localStorage.getItem("token") != null,
    });
    GetData("listing/categories")
      .then((data) => {
        store.dispatch({
          type: "UPDATE_CATEGORY",
          payload: data,
        });
      })
      .catch((e) => {
        if (e === 401) {
          store.dispatch({
            type: "UPDATE_LOGGED_IN",
            payload: false,
          });
        } else {
          console.log("Feil");
        }
      });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Header title="SellPoint" />
        <div className="App">
          <Switch>
            <Route exact path="/registrer" component={Registation} />
            <Route exact path="/logginn" component={SignIn} />
            <Route exact path="/opprett" component={RegisterAd} />
            <Route
              exact
              path="/lagredeannonser"
              render={() => <Products onlyUser={true} />}
            />
            <Route
              exact
              path="/"
              render={() => <Products onlyUser={false} />}
            />
            <Route exact path="/brukerprofil" component={UserProfile} />
            <Route exact path="/profilredigering" component={EditUser} />
            <Route exact path="/passordredigering" component={EditPassword} />
            <Route exact path="/products/:id" component={ProductInfo} />
          </Switch>
        </div>
        <Footer title="SellPoint" description="" />
      </Router>
    </Provider>
  );
}

export default App;
