import { createReducer } from '../utils/reducer.utils'
import {
  FETCH_RA_CLASS,
  FETCH_STUDENT_CLASS,
  FETCH_ADMIN_CLASS,
} from './class.constants'

const initialState = {
  classes: [],
  studentClasses: [],
  adminClasses: [],
}

const fetchRAClasses = (state, payload) => {
  return {
    ...state,
    classes: payload.classes,
  }
}

const fetchStudentClasses = (state, payload) => {
  return {
    ...state,
    studentClasses: payload.classes,
  }
}

const fetchAdminClasses = (state, payload) => {
  return {
    ...state,
    adminClasses: payload.classes,
  }
}

export default createReducer(initialState, {
  [FETCH_RA_CLASS]: fetchRAClasses,
  [FETCH_STUDENT_CLASS]: fetchStudentClasses,
  [FETCH_ADMIN_CLASS]: fetchAdminClasses,
})
