import { createReducer } from '../utils/reducer.utils'
import {
  FETCH_STUDENT_USER,
  FETCH_SPECIFIC_STUDENT_USER,
} from './students.constants'

const initialState = {
  students: [],
  currentStudent: [],
}

const fetchUsers = (state, payload) => {
  return {
    ...state,
    students: payload.students,
  }
}

const fetchStudentDetails = (state, payload) => {
  return {
    ...state,
    currentStudent: payload.students,
  }
}

export default createReducer(initialState, {
  [FETCH_STUDENT_USER]: fetchUsers,
  [FETCH_SPECIFIC_STUDENT_USER]: fetchStudentDetails,
})
