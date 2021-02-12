import Header from "./Header";
import "./App.css";
import Registation from "./user/Registration";
import SignIn from "./user/LogIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <Header title="SellPoint" />
      <div className="App">
        <Switch>
          <Route exact path="/registrer" component={Registation} />
          <Route exact path="/logginn" component={SignIn} />
          <Route exact path="/"></Route>
        </Switch>
      </div>
      <Footer title="SellPoint" description="" />
    </Router>
  );
}

export default App;
