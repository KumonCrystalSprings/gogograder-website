import React from "react";

import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./LoginPage"
import HomePage from "./HomePage"
import WSChooserPage from "./WSChooserPage"

const NoMatch = () => <h2>No Page Found</h2>;

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          {/* <Route path="/admin" component={Admin} />
        <Route path="/worksheets" component={Worksheets} /> */}
          <Route path="/worksheets" exact component={WSChooserPage} />
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