import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Input, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import "../styles/WorksheetProblems.scss"

export default class WorksheetProblems extends React.Component {
  static propTypes = {
    numA: PropTypes.number.isRequired,
    numB: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      secondsElapsed: 0,
      problemAnswers: [],
      hasSubmitted: false,
      checkedAnswers: [],
      modalOpen: false,
      finalMin: 0,
      reportedMin: 0,
      score: ""
    }

    this.tick = this.tick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleMinutesChange = this.handleMinutesChange.bind(this)
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

    this.state.problemAnswers[parseInt(num) - 1] = value
    this.forceUpdate()

    // this.setState(prevState => ({
    //   problemAnswers: { ...prevState.problemAnswers, [num]: value }
    // }))
  }

  handleMinutesChange(event) {
    this.setState({
      reportedMin: event.target.value
    })
  }

  handleSubmit(event) {
    const { checked, score } = this.props.onSubmit(this.state.problemAnswers, this.state.finalMin, this.state.reportedMin)
    this.setState({
      checkedAnswers: checked,
      hasSubmitted: true,
      score: score,
      modalOpen: false
    })
  }

  toggleModal() {
    if (!this.state.modalOpen) {
      this.setState({
        finalMin: Math.round(this.state.secondsElapsed / 60),
        reportedMin: Math.round(this.state.secondsElapsed / 60)
      })
    }
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render() {
    let aRows = []
    for (let i = 1; i <= this.props.numA; i++) {
      aRows.push(
        <Row className="question" key={"problem-" + i}>
          <Col sm="1">
            {i})
          </Col>
          <Col>
            <Input bsSize="sm" name={"problem-" + i} onChange={this.handleInputChange} />
          </Col>
          <Col sm="1">
            {this.state.hasSubmitted &&
              (!this.state.checkedAnswers[i - 1] && <span className="text-danger">&#10005;</span>)
            }
          </Col>
        </Row>
      )
    }

    let bRows = []
    for (let i = this.props.numA + 1; i <= this.props.numA + this.props.numB; i++) {
      bRows.push(
        <Row className="question" key={"problem-" + i}>
          <Col sm="1">
            {i})
          </Col>
          <Col>
            <Input bsSize="sm" name={"problem-" + i} onChange={this.handleInputChange}/>
          </Col>
          <Col sm="1">
            {this.state.hasSubmitted &&
              (!this.state.checkedAnswers[i - 1] && <span className="text-danger">&#10005;</span>)
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
            <span>Time: {Math.floor(this.state.secondsElapsed / 60)}:{("" + this.state.secondsElapsed % 60).padStart(2, "0")}</span>
          </Col>
          <Col>
                    <span className="text-danger">{this.state.score}</span>
                  </Col>
          <Col sm="auto">
            <Button color="primary" onClick={this.toggleModal}>Submit</Button>
            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs="auto" className="pr-1">
                    Time: 
                  </Col>
                  <Col xs="2" className="pr-1">
                    <Input 
                      type="number" 
                      value={this.state.finalMin} 
                      onChange={this.handleMinutesChange} 
                    />
                  </Col>
                  <Col xs="auto" className="p-0">minutes</Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                <Button color="primary" onClick={this.handleSubmit}>Confirm</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </Container>
    )
  }
}