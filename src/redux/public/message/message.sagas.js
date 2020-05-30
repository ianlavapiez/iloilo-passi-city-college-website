import { takeLatest, put, all, call } from 'redux-saga/effects'

import { messageActionTypes } from './message.types'

import { sendMessageFailure, sendMessageSuccess } from './message.actions'

import { addData } from '../../../firebase/firebase-crud-factory.utils'

function* addSendMessage({ payload }) {
  try {
    const { address, contact, fullname, message } = payload
    const isAdded = yield addData('public_message', {
      address,
      contact,
      fullname,
      message,
    })

    if (isAdded) {
      yield put(sendMessageSuccess())
    } else {
      yield put(sendMessageFailure('Something went wrong.'))
    }
  } catch (error) {
    yield put(sendMessageFailure(error.message))
  }
}

export function* onSendMessageStart() {
  yield takeLatest(messageActionTypes.SEND_MESSAGE_START, addSendMessage)
}

export function* messageSagas() {
  yield all([call(onSendMessageStart)])
}
