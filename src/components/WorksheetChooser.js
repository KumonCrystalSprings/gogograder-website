import React from "react"
import PropTypes from 'prop-types'

import Select from 'react-select';

import { Container, Row, Col, Button, Input } from "reactstrap"
import "../styles/WorksheetChooser.scss"
import { Redirect } from "react-router-dom";

export default class WorksheetChooser extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedWorksheet: "",
      selectedPage: "",
      redirect: false
    }

    this.handleWorksheetChange = this.handleWorksheetChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleWorksheetChange(value, actionType) {
    this.setState({ selectedWorksheet: value.label })
  }

  handlePageChange(event) {
    if (event.target.value) {
      this.setState({ selectedPage: event.target.value })
    } else {
      this.setState({ selectedPage: null })
    }
  }

  handleSubmit(event) {
    this.props.onSelect(this.props.selectedWorksheet, this.props.selectedPage)
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/worksheets/" + this.state.selectedWorksheet + "/" + this.state.selectedPage} />
    }

    return (
      <Container className="chooser">
        <Row className="chooser-title">
          <Col>
            <h1>Choose a worksheet:</h1>
          </Col>
        </Row>
        <Row className="chooser-select">
          <Col>
            <Select options={this.props.options} placeholder="worksheet" onChange={this.handleWorksheetChange} />
          </Col>
          <Col xs="2" className="p-0">
            <Input type="number" placeholder="page" onChange={this.handlePageChange} />
          </Col>
          <Col xs="auto">
            <Button color="primary" disabled={!(this.state.selectedWorksheet && this.state.selectedPage)} onClick={this.handleSubmit}>Go!</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}