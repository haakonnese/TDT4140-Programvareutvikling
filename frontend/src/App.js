import React from "react";
import Products from "./marketplace/components/Products/Products";
import Navbar from "./marketplace/components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductInfo from "./marketplace/components/ProductInfo/ProductInfo";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route exact path="/products/:id" component={ProductInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
