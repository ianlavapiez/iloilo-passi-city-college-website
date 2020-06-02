import { createReducer } from '../utils/reducer.utils'
import { FETCH_STUDENT_USER } from './students.constants'

const initialState = {
  students: [],
}

const fetchUsers = (state, payload) => {
  return {
    ...state,
    students: payload.students,
  }
}

export default createReducer(initialState, {
  [FETCH_STUDENT_USER]: fetchUsers,
})
