import { raUserActionTypes } from './ra-user.types'

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
}

const raUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case raUserActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
      }
    case raUserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isLoading: false,
      }
    case raUserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isLoading: false,
      }
    case raUserActionTypes.SIGN_IN_FAILURE:
    case raUserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default raUserReducer
