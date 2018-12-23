import React from "react";

import { Navbar, NavbarBrand, Button, Container, Row, Form, FormGroup, Label, Input } from "reactstrap"
import { Link } from "react-router-dom";

import "./Login.scss"

export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    // this.setState({ loginScreen: false })
  }

  render() {
    return (
      <div>
        <Navbar color="light" light>
          <NavbarBrand tag={Link} to="/">GoGoGrader</NavbarBrand>
          <Button color="danger" tag={Link} to="/admin">Admin Login</Button>
        </Navbar>

        <Container className="login d-flex h-100">
          <Row className="justify-content-center align-self-center">
            <Form>
              <FormGroup>
                <Label for="inputName">Name</Label>
                <Input type="text" id="inputName" placeholder="John Smith" />
              </FormGroup>
              <FormGroup>
                <Label for="inputId">ID</Label>
                <Input type="text" id="inputId" placeholder="00" />
              </FormGroup>
              <Button color="primary" onClick={this.handleLogin}>Submit</Button>
            </Form>
          </Row>
        </Container>
      </div>
    )
  }
}