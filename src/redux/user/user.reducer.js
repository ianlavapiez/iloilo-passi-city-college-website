import { userActionTypes } from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  isSuccessful: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.FETCH_USER_START:
    case userActionTypes.SIGN_UP_START:
    case userActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
      }
    case userActionTypes.FETCH_USER_SUCCESS:
    case userActionTypes.SIGN_IN_SUCCESS:
    case userActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isLoading: false,
        isSuccessful: true,
      }
    case userActionTypes.CHECK_USER_SESSION:
      return {
        isLoading: false,
      }
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isLoading: false,
      }
    case userActionTypes.FETCH_USER_FAILURE:
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSuccessful: false,
      }
    default:
      return state
  }
}

export default userReducer
