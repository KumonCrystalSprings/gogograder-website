import React from "react"

import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from "../components/Header"
import LoginDialogue from "../components/LoginDialogue";
import { loginStudent } from "../actions"

class LoginPage extends React.Component {
  static propTypes = {
    loginStudent: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      loginSuccess: false
    }

    this.login = this.login.bind(this)
  }

  login(name, id) {
    return this.props.loginStudent(name, id)
      .then(success => {
        if (success) {
          this.setState({loginSuccess: true})
        }
        return success;
      })
  }

  render() {
    if (this.state.loginSuccess) {
      return <Redirect push to="/worksheets" />
    }

    return (
      <div>
        <Header />
        <LoginDialogue 
          login={this.login}
        />
      </div>
    )
  }
}

export default connect(null, {loginStudent})(LoginPage)