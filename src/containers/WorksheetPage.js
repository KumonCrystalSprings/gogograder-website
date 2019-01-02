import React from "react"
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Header from "../components/Header"
import WorksheetProblems from "../components/WorksheetProblems";
import WorksheetTitle from "../components/WorksheetTitle";

 class WorksheetPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        worksheet: PropTypes.string.isRequired,
        page: PropTypes.string.isRequired
      })
    })
  }

  getWorksheets() {

  }

  handleSubmit(answers) {
    return [true, false, false, true, true, false, false, true, true, true, false]
  }

  render() {
    return (
      <div>
        <Header>
          <span className="navbar-name">{this.props.name}</span>
        </Header>
        <WorksheetTitle ws={this.props.match.params.worksheet} page={this.props.match.params.page}/>
        <WorksheetProblems numA={5} numB={6} onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.account.name
})

export default connect(mapStateToProps )(WorksheetPage)