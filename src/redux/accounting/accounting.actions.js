import { accountingActionTypes } from './accounting.types'

export const addAccountingDetailsStart = (data) => ({
  type: accountingActionTypes.ADD_PAYMENT_DETAILS_START,
  payload: data,
})

export const addAccountingDetailsSuccess = (data) => ({
  type: accountingActionTypes.ADD_PAYMENT_DETAILS_SUCCESS,
  payload: data,
})

export const addAccountingDetailsFailure = (errorMessage) => ({
  type: accountingActionTypes.ADD_PAYMENT_DETAILS_FAILURE,
  payload: errorMessage,
})

export const fetchAccountingDetailsStart = () => ({
  type: accountingActionTypes.FETCH_PAYMENT_DETAILS_START,
})

export const fetchAccountingDetailsSuccess = (user) => ({
  type: accountingActionTypes.FETCH_PAYMENT_DETAILS_SUCCESS,
  payload: user,
})

export const fetchAccountingDetailsFailure = (errorMessage) => ({
  type: accountingActionTypes.FETCH_PAYMENT_DETAILS_FAILURE,
  payload: errorMessage,
})
