import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, Admin, Login } from "./pages"

const NoMatch = () => <h2>No Page Found</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/admin" component={Admin} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;