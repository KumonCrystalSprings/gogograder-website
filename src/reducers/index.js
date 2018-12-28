import { combineReducers } from 'redux'

function accountType(state = "LOGGED_OUT", action) {
  switch (action.type) {
    case "LOGIN":
      return action.accountType
    case "LOGOUT":
      return "LOGGED_OUT"
    default:
      return state
  }
}

function session(state = {}, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        id: action.sessionId,
        expires: action.sessionExpires
      }
    case "LOGOUT":
      return {}
    default:
      return state
  }
}

function worksheet(state = {}, action) {
  switch (action.type) {
    case "CHOOSE_WORKSHEET":
      return {
        name: action.worksheetName
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: combineReducers({
    accountType,
    session
  }),
  worksheet
})

export default rootReducer