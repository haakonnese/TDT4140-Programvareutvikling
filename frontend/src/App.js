import Header from "./Header";
import React, { useState } from "react";
import "./App.css";
import Registation from "./user/Registration";
import SignIn from "./user/LogIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("token") != null
  );
  function changeLoggedIn(value) {
    setLoggedIn(value);
  }

  return (
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
          <Route exact path="/"></Route>
        </Switch>
      </div>
      <Footer title="SellPoint" description="" />
    </Router>
  );
}

export default App;
