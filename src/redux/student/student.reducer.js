import { studentActionTypes } from './student.types'

const INITIAL_STATE = {
  students: null,
  isLoading: false,
  error: null,
  isSuccessful: false,
  isVerified: false,
}

const studentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case studentActionTypes.VERIFY_STUDENT_USER_START:
    case studentActionTypes.FETCH_STUDENT_USER_START:
      return {
        ...state,
        isLoading: true,
      }
    case studentActionTypes.VERIFY_STUDENT_USER_SUCCESS:
      return {
        ...state,
        isVerified: true,
        isLoading: false,
        isSuccessful: true,
      }
    case studentActionTypes.FETCH_STUDENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        students: action.payload,
      }
    case studentActionTypes.VERIFY_STUDENT_USER_FAILURE:
    case studentActionTypes.FETCH_STUDENT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export default studentReducer
