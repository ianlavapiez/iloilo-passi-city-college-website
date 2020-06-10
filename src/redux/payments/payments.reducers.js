import { createReducer } from '../utils/reducer.utils'
import {
  FETCH_STUDENT_PAYMENTS,
  FETCH_STUDENT_PAYMENT_TRAIL,
  FETCH_SPECIFIC_STUDENT_PAYMENT,
} from './payments.constants'

const initialState = {
  payments: [],
  studentPayments: [],
  paymentTrail: [],
}

const fetchPayments = (state, payload) => {
  return {
    ...state,
    payments: payload.payments,
  }
}

const fetchStudentPayments = (state, payload) => {
  return {
    ...state,
    studentPayments: payload.payments,
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
  [FETCH_SPECIFIC_STUDENT_PAYMENT]: fetchStudentPayments,
  [FETCH_STUDENT_PAYMENT_TRAIL]: fetchPaymentTrail,
})
