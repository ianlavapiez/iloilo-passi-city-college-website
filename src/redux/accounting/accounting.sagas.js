import { takeLatest, call, put, all } from 'redux-saga/effects'

import {
  addData,
  retrieveData,
} from '../../firebase/firebase-crud-factory.utils'

import {
  addAccountingDetailsSuccess,
  addAccountingDetailsFailure,
  fetchAccountingDetailsSuccess,
  fetchAccountingDetailsFailure,
} from './accounting.actions'

import { accountingActionTypes } from './accounting.types'

export function* fetchAccountingDetailsAsync() {
  try {
    const snapshot = yield retrieveData('payments')

    yield put(fetchAccountingDetailsSuccess(snapshot))
  } catch (error) {
    yield put(fetchAccountingDetailsFailure(error.message))
  }
}

export function* addAccountingDetailsAsync({ payload }) {
  const { studentId, raId, fee, program, schoolYear } = payload.accounting

  try {
    const snapshot = yield addData('payments', {
      studentId,
      raId,
      fee,
      program,
      schoolYear,
      paymentTrail: [],
    })

    yield put(addAccountingDetailsSuccess(snapshot))
    yield fetchAccountingDetailsStart()
  } catch (error) {
    yield put(addAccountingDetailsFailure(error.message))
  }
}

export function* addAccountingDetailsStart() {
  yield takeLatest(
    accountingActionTypes.ADD_PAYMENT_DETAILS_START,
    addAccountingDetailsAsync
  )
}

export function* fetchAccountingDetailsStart() {
  yield takeLatest(
    accountingActionTypes.FETCH_PAYMENT_DETAILS_START,
    fetchAccountingDetailsAsync
  )
}

export function* accountingSagas() {
  yield all([
    call(addAccountingDetailsStart),
    call(fetchAccountingDetailsStart),
  ])
}
