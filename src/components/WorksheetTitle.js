import React from "react"
import PropTypes from 'prop-types'
import { Container, Row, Col, Input } from "reactstrap";

import "../styles/WorksheetHeader.scss"

export default class WorksheetTitle extends React.Component {
  static propTypes = {
    ws: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired
  }

  render() {
    return (
      <Container>
        <Row>
            <Col className="ws-title mt-5">
              <h3>{this.props.ws}</h3>
            </Col>
          </Row>
          <Row className="justify-content-md-center ws-page">
            <Col sm="auto">
              Page
            </Col>
            <Col sm="auto">
              <Input type="number" size="sm" value={this.props.page} />
            </Col>
          </Row>
      </Container>
    )
  }
}