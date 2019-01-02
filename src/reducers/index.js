import { combineReducers } from 'redux'

function account(state = {}, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        accountType: action.accountType,
        name: action.name,
        studentId: action.studentId,
        sessionId: action.sessionId,
        expires: action.expires
      }
    case "LOGOUT":
      return {}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account
})

export default rootReducer