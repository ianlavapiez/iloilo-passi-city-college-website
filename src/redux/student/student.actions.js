import { studentActionTypes } from './student.types'

export const fetchStudentStart = () => ({
  type: studentActionTypes.FETCH_STUDENT_USER_START,
})

export const fetchStudentSuccess = (user) => ({
  type: studentActionTypes.FETCH_STUDENT_USER_SUCCESS,
  payload: user,
})

export const fetchStudentFailure = (errorMessage) => ({
  type: studentActionTypes.FETCH_STUDENT_USER_FAILURE,
  payload: errorMessage,
})

export const verifyStudentStart = () => ({
  type: studentActionTypes.VERIFY_STUDENT_USER_START,
})

export const verifyStudentSuccess = (user) => ({
  type: studentActionTypes.VERIFY_STUDENT_USER_SUCCESS,
  payload: user,
})

export const verifyStudentFailure = (errorMessage) => ({
  type: studentActionTypes.VERIFY_STUDENT_USER_FAILURE,
  payload: errorMessage,
})
