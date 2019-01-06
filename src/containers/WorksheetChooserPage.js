import React from "react"

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from "../components/Header"
import WorksheetChooser from "../components/WorksheetChooser"
import { selectWorksheet } from "../actions"
import Redirect from "react-router-dom/Redirect";
import axios from "axios";

class WorksheetChooserPage extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    selectWorksheet: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      invalidLogin: false,
      options: []
    }

    this.getWorksheets = this.getWorksheets.bind(this)
  }

  componentDidMount() {
    this.getWorksheets()
  }

  getWorksheets() {
    return axios.get("http://api.gogograder.com/worksheets", {params:{id: this.props.account.sessionId}})
      .then(resp => {
        let options = []
        for (var i of resp.data) {
          options.push({ value: i, label: i })
        }
        return options
      })
      .then(options => {
        this.setState({options: options})
      })
      .catch(resp => {
        console.log(resp)
        this.setState({invalidLogin: true})
      })
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
        <WorksheetChooser onSelect={this.props.selectWorksheet} options={this.state.options} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.account.name,
  account: state.account
})

export default connect(mapStateToProps, {selectWorksheet})(WorksheetChooserPage)