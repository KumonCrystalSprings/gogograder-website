export const loginStudent = (name, id) => (dispatch) => {
  // return new Promise((resolve, reject) => setInterval(resolve, 2000, true))
  return new Promise((resolve, reject) => setInterval(resolve, 1000, {name: name, studentId: id, sessionId: "asdf", expires: 0}))
    .then((resp) => {
      dispatch(setStudent(resp))
      return true
    })
}


const setStudent = ({name, studentId, sessionId, expires}) => ({
  type: "LOGIN",
  accountType: "STUDENT",
  name: name,
  studentId: studentId,
  sessionId: sessionId,
  expires: 0
})

export const logout = () => ({ type: "LOGOUT" })

export const selectWorksheet = (name, page) => ({
  type: "CHOOSE_WORKSHEET",
  name: name,
  page: page
})