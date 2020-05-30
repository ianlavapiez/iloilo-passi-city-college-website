import { all, call } from 'redux-saga/effects'

import { userSagas } from './user/user.sagas'
import { messageSagas } from './public/message/message.sagas'
import { studentSagas } from './student/student.sagas'

export default function* rootSaga() {
  yield all([call(userSagas), call(messageSagas), call(studentSagas)])
}
