import Header from "./Header";
import React, { useEffect, useState } from "react";
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
import SeeRating from "./rating/SeeRating";
import store from "./reducers";
import EditPassword from "./user/UserInfo/EditPassword";
import Error from "./Error";

function App() {
  const [categoryError, setCategoryError] = useState(false);
  const [ready, setReady] = useState(false);
  // default når appen lastes.
  useEffect(() => {
    // sett logg inn til true dersom token er lagret
    store.dispatch({
      type: "UPDATE_LOGGED_IN",
      payload: localStorage.getItem("token") != null,
    });
    // last inn kategorier
    GetData("listing/categories")
      .then((data) => {
        store.dispatch({
          type: "UPDATE_CATEGORY",
          payload: data,
        });
        setReady(true);
      })
      .catch((e) => {
        // dersom man er 'logget inn' som ugyldig
        // bruker og dermed ikke kan laste inn kategorier,
        // fjern at man er logget inn og last inn kategorier på ny
        if (e === 401) {
          store.dispatch({
            type: "UPDATE_LOGGED_IN",
            payload: false,
          });
          setCategoryError(true);
        } else {
          console.log("Feil");
        }
      });
  }, [categoryError]);
  return (
    <div>
      {!ready ? null : (
        // Bruk provider slik at props kan nås av alle komponenter
        <Provider store={store}>
          <Router>
            <Header title="SellPoint" />
            <div className="App">
              {/* Send bruker til riktig komponent når en gitt link er tastet inn */}
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
                <Route exact path="/brukerannonser" component={UserAds} />
                <Route exact path="/profilredigering" component={EditUser} />
                <Route
                  exact
                  path="/passordredigering"
                  component={EditPassword}
                />
                <Route exact path="/products/:id" component={ProductInfo} />
                <Route exact path="/endreannonse/:id" component={EditAd} />
                <Route exact path="/" component={Products}></Route>
                <Route
                  exact
                  path="/bruker/:userId"
                  component={SeeRating}
                ></Route>
                <Route exact path="/products/:id" component={ProductInfo} />
                <Route exact path="/rating/:id" component={GiveRating} />
                <Route exact path="/404" component={Error} />
                <Route path="/" component={Error} />
              </Switch>
            </div>
            <Footer title="SellPoint" description="" />
          </Router>
        </Provider>
      )}
    </div>
  );
}

export default App;
