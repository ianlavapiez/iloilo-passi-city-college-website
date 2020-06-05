import { createReducer } from '../utils/reducer.utils'
import { FETCH_STUDENT_PAYMENTS } from './payments.constants'

const initialState = {
  payments: [],
}

const fetchPayments = (state, payload) => {
  return {
    ...state,
    payments: payload.payments,
  }
}

export default createReducer(initialState, {
  [FETCH_STUDENT_PAYMENTS]: fetchPayments,
})
