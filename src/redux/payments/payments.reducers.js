import { createReducer } from '../utils/reducer.utils'
import {
  FETCH_STUDENT_PAYMENTS,
  FETCH_STUDENT_PAYMENT_TRAIL,
} from './payments.constants'

const initialState = {
  payments: [],
  paymentTrail: [],
}

const fetchPayments = (state, payload) => {
  return {
    ...state,
    payments: payload.payments,
  }
}

const fetchPaymentTrail = (state, payload) => {
  return {
    ...state,
    paymentTrail: payload.paymentTrail,
  }
}

export default createReducer(initialState, {
  [FETCH_STUDENT_PAYMENTS]: fetchPayments,
  [FETCH_STUDENT_PAYMENT_TRAIL]: fetchPaymentTrail,
})
