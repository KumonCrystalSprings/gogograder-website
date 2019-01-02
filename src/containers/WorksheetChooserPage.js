import React from "react"

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from "../components/Header"
import WorksheetChooser from "../components/WorksheetChooser"
import { selectWorksheet } from "../actions"

class WorksheetChooserPage extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    selectWorksheet: PropTypes.func.isRequired
  }
  render() {
    return (
      <div>
        <Header>
          <span className="navbar-name">{this.props.name}</span>
        </Header>
        <WorksheetChooser onSelect={this.props.selectWorksheet} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.account.name
})

export default connect(mapStateToProps, {selectWorksheet})(WorksheetChooserPage)