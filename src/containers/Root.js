import React from "react";

import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StudentLoginPage from "./StudentLoginPage"
import HomePage from "./HomePage"
import WorksheetChooserPage from "./WorksheetChooserPage"
import AdminLoginPage from "./AdminLoginPage";
import WorksheetPage from "./WorksheetPage";

const NoMatch = () => <h2>No Page Found</h2>;

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={StudentLoginPage} />
          <Route path="/admin" exact component={AdminLoginPage} />
          <Route path="/worksheets" exact component={WorksheetChooserPage} />
          <Route path="/worksheets/:worksheet/:page" component={WorksheetPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;