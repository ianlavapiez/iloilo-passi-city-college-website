import { takeLatest, put, all, call } from 'redux-saga/effects'

import { raUserActionTypes } from './ra-user.types'

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from './ra-user.actions'

import {
  auth,
  createRaUserProfileDocument,
  getRACurrentUser,
} from '../../firebase/firebase.utils'

import { popupMessageDialog } from '../../components/common/popup-message/popup-message.component'

function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createRaUserProfileDocument,
      userAuth,
      additionalData
    )
    const userSnapshot = yield userRef.get()

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    yield popupMessageDialog('success', 'Welcome RA')
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
    const userAuth = yield getRACurrentUser()

    if (!userAuth) return

    yield getSnapshotFromUserAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error.message))
  }
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
  yield takeLatest(raUserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignOutStart() {
  yield takeLatest(raUserActionTypes.SIGN_OUT_START, signOut)
}

export function* onCheckUserSession() {
  yield takeLatest(raUserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* raUserSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
  ])
}
