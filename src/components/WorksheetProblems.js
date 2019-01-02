import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Input, Button } from "reactstrap";

import "../styles/WorksheetProblems.scss"

export default class WorksheetProblems extends React.Component {
  static propTypes = {
    numA: PropTypes.string.isRequired,
    numB: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      secondsElapsed: 0,
      problemAnswers: {},
      hasSubmitted: false,
      checkedAnswers: {}
    }

    this.tick = this.tick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    })
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const num = target.name.substring(8)

    this.setState(prevState => ({
      problemAnswers: {...prevState.problemAnswers, [num]: value}
    }))
  }

  handleSubmit(event) {
    const checked = this.props.onSubmit(this.state.problemAnswers)
    this.setState({
      checkedAnswers: checked,
      hasSubmitted: true
    })
  }

  render() {
    let aRows = []
    for (let i = 1; i <= this.props.numA; i++) {
      aRows.push(
        <Row className="question">
          <Col sm="1">
            {i})
          </Col>
          <Col>
            <Input size="sm" name={"problem-" + i}/>
          </Col>
          <Col sm="1">
          {this.state.hasSubmitted &&
            (this.state.checkedAnswers[i-1] ? 
              <span className="text-success">&#9711;</span> :
              <span className="text-danger">&#10005;</span>
            )
          }
          </Col>
        </Row>
      )
    }

    let bRows = []
    for (let i = this.props.numA+1; i <= this.props.numA + this.props.numB; i++) {
      bRows.push(
        <Row className="question">
          <Col sm="1">
            {i})
          </Col>
          <Col>
            <Input size="sm" name={"problem-" + i}/>
          </Col>
          <Col sm="1">
          {this.state.hasSubmitted &&
            (this.state.checkedAnswers[i-1] ? 
              <span className="text-success">&#9711;</span> :
              <span className="text-danger">&#10005;</span>
            )
          }
          </Col>
        </Row>
      )
    }

    return (
      <Container className="problems">
        <Row className="problem-view">
          <Col lg="6" className="side-a">
            Side A

              {aRows}
          </Col>
          <Col lg="6" className="side-b">
            Side B

              {bRows}
          </Col>
        </Row>
        <Row className="submit-bar justify-content-between">
          <Col>
            <span>Time: {Math.round(this.state.secondsElapsed / 60)}:{("" + this.state.secondsElapsed % 60).padStart(2, "0")}</span>
          </Col>
          <Col sm="auto">
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}