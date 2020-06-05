import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

import publicMessagingReducer from './public-messaging/public-messaging.reducers'
import asyncReducer from './async/async.reducer'
import studentReducer from './students/students.reducers'
import authReducer from './auth/auth.reducer'
import paymentReducer from './payments/payments.reducers'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  async: asyncReducer,
  auth: authReducer,
  publicMessages: publicMessagingReducer,
  students: studentReducer,
  payments: paymentReducer,
})

export default rootReducer
