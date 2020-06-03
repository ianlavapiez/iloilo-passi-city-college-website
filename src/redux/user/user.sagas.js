import { takeLatest, put, all, call } from 'redux-saga/effects'

import { userActionTypes } from './user.types'

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  fetchUserSuccess,
  fetchUserFailure,
} from './user.actions'

import {
  auth,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils'

import { popupMessageDialog } from '../../components/common/popup-message/popup-message.component'

function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    )
    const userSnapshot = yield userRef.get()

    if (userSnapshot.exists) {
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
      yield put(
        fetchUserSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      )
    } else {
      yield put(signInFailure('Something went wrong.'))
      yield put(fetchUserFailure('Something went wrong.'))
    }
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)

    yield getSnapshotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()

    if (!userAuth) return

    yield getSnapshotFromUserAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

function* signUp({
  payload: { address, contact, course, email, displayName, password, program },
}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)

    yield put(
      signUpSuccess({
        user,
        additionalData: {
          address,
          contact,
          course,
          email,
          displayName,
          program,
          type: 'student',
          verified: false,
        },
      })
    )
  } catch (error) {
    yield put(signUpFailure(error.message))
  }
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData)
  yield signOut()
  yield popupMessageDialog(
    'success',
    'Thank you for registering. We will notify you once you are validated.'
  )
}

function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error.message))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ])
}
