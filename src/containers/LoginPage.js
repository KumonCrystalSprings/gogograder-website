import React from "react"

import { Button } from "reactstrap"
import { Link } from "react-router-dom";

import Header from "../components/Header"
import LoginDialogue from "../components/LoginDialogue";

export default class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Header>
          <Button color="danger" tag={Link} to="/admin">Admin Login</Button>
        </Header>
        <LoginDialogue 
          attemptLogin={(name, id) => (new Promise((resolve, reject) => setInterval(resolve, 2000, true)))} // TODO
        />
      </div>
    )
  }
}