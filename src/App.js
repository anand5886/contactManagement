import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Home } from "./Components/Home/Home";
import { Logout } from "./Components/Logout/Logout";
import { Footer } from "./Components/SharedServices/Footer/Footer";
import { LoadingIndicator } from "./Components/SharedServices/Generics/LoadingIndicator";
import { Contact } from "./Components/Contacts/Contact";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12">
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />

                <Route exact path="/Home" component={Home} />
                <Route exact path="/Logout" component={Logout} />
                <Home>
                  <Route path="/Contact" component={Contact} />
                </Home>
              </Switch>
            </Router>
          </div>
        </div>
        <div className="row">
          <LoadingIndicator></LoadingIndicator>
        </div>
        <div className="row">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
export default App;
