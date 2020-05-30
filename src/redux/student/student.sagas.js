import { takeLatest, call, put, all } from 'redux-saga/effects'

import { retrieveData } from '../../firebase/firebase-crud-factory.utils'

import { fetchStudentSuccess, fetchStudentFailure } from './student.actions'

import { studentActionTypes } from './student.types'

export function* fetchStudentsAsync() {
  try {
    const snapshot = yield retrieveData('users')

    yield put(fetchStudentSuccess(snapshot))
  } catch (error) {
    yield put(fetchStudentFailure(error.message))
  }
}

export function* verifyStudentAsync() {
  try {
    const snapshot = yield retrieveData('users')

    yield put(fetchStudentSuccess(snapshot))
  } catch (error) {
    yield put(fetchStudentFailure(error.message))
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
  yield all([call(fetchStudentsStart)])
}
