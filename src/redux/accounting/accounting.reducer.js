import { accountingActionTypes } from './accounting.types'

const INITIAL_STATE = {
  payments: null,
  isLoading: false,
  error: null,
  isSuccessful: false,
}

const accountingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case accountingActionTypes.FETCH_PAYMENT_DETAILS_START:
    case accountingActionTypes.ADD_PAYMENT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case accountingActionTypes.ADD_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
      }
    case accountingActionTypes.FETCH_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        payments: action.payload,
        isLoading: false,
        isSuccessful: true,
      }
    case accountingActionTypes.FETCH_PAYMENT_DETAILS_FAILURE:
    case accountingActionTypes.ADD_PAYMENT_DETAILS_FAILURE:
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

export default accountingReducer
