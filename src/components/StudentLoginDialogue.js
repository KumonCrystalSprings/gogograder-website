import React from "react"
import PropTypes from 'prop-types'

import { Button, Container, Row, Form, FormGroup, Label, Input } from "reactstrap"

import "../styles/StudentLoginDialogue.scss"

export default class StudentLoginDialogue extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      id: "",
      loginFailure: false,
      loginError: false,
      processingLogin: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    this.setState({
      processingLogin: true
    })

    this.props.login(this.state.name, this.state.id)
      .then(success => {
        if (!success) {
          this.setState({
            loginFailure: true,
            processingLogin: false
          })
        }
      })
      .catch(err => {
        this.setState({
          loginError: true,
          processingLogin: false
        })
        console.log(err)
      })
  }

  render() {
    return (
      <Container className="login">
        <Row className="justify-content-center">
            <Form>
              <FormGroup>
                <Label for="inputName">Name</Label>
                <Input
                  type="text"
                  id="inputName"
                  placeholder="John Smith"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  disabled={this.state.processingLogin}
                />
              </FormGroup>
              <FormGroup>
                <Label for="inputId">ID</Label>
                <Input
                  type="number"
                  id="inputId"
                  placeholder="00"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                  disabled={this.state.processingLogin}
                />
              </FormGroup>
              {this.state.loginFailure &&
                <p className="text-danger">Login incorrect. Please try again.</p>
              }
              {this.state.loginError &&
                <p className="text-danger">Error while logging in. Please try again</p>
              }
              <Button
                color="primary"
                onClick={this.handleSubmit}
                disabled={this.state.processingLogin}
              >Submit</Button>
            </Form>
        </Row>
      </Container>

    )
  }
}