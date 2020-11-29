import { createReducer } from '../utils/reducer.utils'
import {
  FETCH_STUDENT_PAYMENTS,
  FETCH_STUDENT_PAYMENT_TRAIL,
  FETCH_SPECIFIC_STUDENT_PAYMENT,
  FETCH_STUDENT_UNVERIFIED_PAYMENT_TRAIL,
  FETCH_ADMIN_PAYMENTS,
} from './payments.constants'

const initialState = {
  payments: [],
  studentPayments: [],
  paymentTrail: [],
  adminPayments: [],
  unverifiedPaymentTrail: [],
}

const fetchPayments = (state, payload) => {
  return {
    ...state,
    payments: payload.payments,
  }
}

const fetchAdminPayments = (state, payload) => {
  return {
    ...state,
    adminPayments: payload.payments,
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

const fetchUnverifiedPaymentTrail = (state, payload) => {
  return {
    ...state,
    unverifiedPaymentTrail: payload.paymentTrail,
  }
}

export default createReducer(initialState, {
  [FETCH_STUDENT_PAYMENTS]: fetchPayments,
  [FETCH_SPECIFIC_STUDENT_PAYMENT]: fetchStudentPayments,
  [FETCH_STUDENT_PAYMENT_TRAIL]: fetchPaymentTrail,
  [FETCH_STUDENT_UNVERIFIED_PAYMENT_TRAIL]: fetchUnverifiedPaymentTrail,
  [FETCH_ADMIN_PAYMENTS]: fetchAdminPayments,
})
