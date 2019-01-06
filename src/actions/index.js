import axios from "axios";

export const loginStudent = (name, password) => (dispatch) => {
  // return new Promise((resolve, reject) => setInterval(resolve, 1000, {name: name, studentId: id, sessionId: "asdf", expires: 0}))
  //   .then((resp) => {
  //     dispatch(setStudent(resp))
  //     return true
  //   })
  return axios.post("http://localhost/login", JSON.stringify({ name: name, password: password }))
    .then(resp => {
      dispatch(setStudent(name, resp.data))
      return true
    })
    .catch(resp => {
      return false
    })
}


const setStudent = (name, sessionId) => ({
  type: "LOGIN",
  accountType: "STUDENT",
  name: name,
  sessionId: sessionId,
})

export const logout = () => ({ type: "LOGOUT" })

export const selectWorksheet = (name, page) => ({
  type: "CHOOSE_WORKSHEET",
  name: name,
  page: page
})