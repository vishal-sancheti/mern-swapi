import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import People from "./pages/People";
import Person from "./pages/Person";

export default function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route exact path="/people">
            <People />
          </Route>
          <Route exact path="/people/:id">
            <Person />
          </Route>
          <Route path="/">
            <div>404 Page not found.</div>
          </Route>
        </Switch>
      </Router>
  );
}