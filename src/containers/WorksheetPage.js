import React from "react"
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import axios from "axios"

import Header from "../components/Header"
import WorksheetProblems from "../components/WorksheetProblems";
import WorksheetTitle from "../components/WorksheetTitle";
import { Redirect } from "react-router-dom";

 class WorksheetPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        worksheet: PropTypes.string.isRequired,
        page: PropTypes.string.isRequired,
      })
    }),
    account: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      invalidLogin: false,
      correctAnswers: [],
      grading: [],
      numA: 0,
      numB: 0
    }

    this.getAnswers = this.getAnswers.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkAnswers = this.checkAnswers.bind(this)
  }

  componentDidMount() {
    this.getAnswers()
  }

  getAnswers() {
    return axios.get("http://api.gogograder.com/worksheets/" + this.props.match.params.worksheet + "/" + this.props.match.params.page, {params:{id: this.props.account.sessionId}})
      .then(resp => {
        this.setState({
          correctAnswers: resp.data.answers,
          grading: resp.data.grading,
          numA: resp.data.sideA,
          numB: resp.data.sideB
        })
      })
  }

  handleSubmit(answers, time, reportedTime) {
    let checked = this.checkAnswers(answers)
    console.log(checked)
    let numWrong = 0;
    for (let i of checked) {
      if (!i) {
        numWrong++
      }
    }
    let score = ""
    if (this.state.grading[0].includes(numWrong.toString())) {
      score = "100%"
    } else if (this.state.grading[1].includes(numWrong.toString())) {
      score = "90%"
    } else if (this.state.grading[2].includes(numWrong.toString())) {
      score = "80%"
    } else if (this.state.grading[3].includes(numWrong.toString())) {
      score = "70%"
    } else {
      score = "60%"
    }

    axios.post("http://api.gogograder.com/submit", JSON.stringify({
      worksheet: this.props.match.params.worksheet,
      page: parseInt(this.props.match.params.page),
      score: parseInt(score.substring(0, score.length - 2)),
      time: time,
      reportedTime: reportedTime
    }), {params:{id: this.props.account.sessionId}})

    return { checked, score }
  }

  checkAnswers(answers) {
    let checked = []

    outerloop:
    for (let i = 0; i < this.state.correctAnswers.length; i++) {
      if (answers[i] === undefined) {
        checked.push(false)
        continue
      }

      let correct = this.state.correctAnswers[i].trim()
      if (correct.includes("[") && correct.includes("]")) {
        checked.push(true)
        continue
      }

      let submitted = answers[i].trim()
      if (correct.includes(",")) {
        
        let correctSplit = correct.split(",").map((item) => ( item.trim() ));
        let submitSplit = submitted.split(",").map((item) => ( item.trim() ));
        if (correctSplit.length !== submitSplit.length) {
          checked.push(false)
          continue
        }
        for (let j = 0; j < correctSplit.length; j++) {
          if (!correctSplit.includes(submitSplit[j])) {
            checked.push(false)
            continue outerloop
          }
        }
        checked.push(true)
      } else {
        checked.push(correct === submitted)
      }
    }
    return checked
  }

  render() {
    if (this.props.account.accountType === "LOGGED_OUT" || this.state.invalidLogin) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Header>
          <span className="navbar-name">{this.props.name}</span>
        </Header>
        <WorksheetTitle ws={this.props.match.params.worksheet} page={this.props.match.params.page}/>
        <WorksheetProblems numA={this.state.numA} numB={this.state.numB} onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account
})

export default connect(mapStateToProps)(WorksheetPage)