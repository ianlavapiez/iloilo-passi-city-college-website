import { takeLatest, call, put, all } from 'redux-saga/effects'

import {
  retrieveData,
  updateData,
} from '../../firebase/firebase-crud-factory.utils'

import {
  fetchStudentSuccess,
  fetchStudentFailure,
  verifyStudentSuccess,
  verifyStudentFailure,
} from './student.actions'

import { studentActionTypes } from './student.types'

export function* fetchStudentsAsync() {
  try {
    const snapshot = yield retrieveData('users')

    yield put(fetchStudentSuccess(snapshot))
  } catch (error) {
    yield put(fetchStudentFailure(error.message))
  }
}

export function* verifyStudentAsync({ payload }) {
  try {
    const snapshot = yield updateData('users', payload)

    yield put(verifyStudentSuccess(snapshot))
    yield fetchStudentsStart()
  } catch (error) {
    yield put(verifyStudentFailure(error.message))
  }
}

export function* fetchStudentsStart() {
  yield takeLatest(
    studentActionTypes.FETCH_STUDENT_USER_START,
    fetchStudentsAsync
  )
}

export function* verifyStudentStart() {
  yield takeLatest(
    studentActionTypes.VERIFY_STUDENT_USER_START,
    verifyStudentAsync
  )
}

export function* studentSagas() {
  yield all([call(fetchStudentsStart), call(verifyStudentStart)])
}
