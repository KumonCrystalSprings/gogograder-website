import { combineReducers } from 'redux'

function account(state = {}, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        accountType: action.accountType,
        name: action.name,
        sessionId: action.sessionId,
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