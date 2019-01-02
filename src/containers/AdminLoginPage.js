import React from "react"

import PropTypes from 'prop-types'

import Header from "../components/Header"

export default class AdminLoginPage extends React.Component {
  static propTypes = {
    loginStudent: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <Header>
          admin
        </Header>
        not yet available
      </div>
    )
  }
}