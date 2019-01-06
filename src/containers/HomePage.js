import React from "react"

import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'


function HomePage(props) {
  if (props.account === "LOGGED_OUT") {
    return (
      <Redirect to="/login" />
    )
  } else {
    return (
      <Redirect to="/worksheets" />
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account.accountType
})

export default connect(mapStateToProps)(HomePage)