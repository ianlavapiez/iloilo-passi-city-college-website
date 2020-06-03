import { raUserActionTypes } from './ra-user.types'

export const emailSignInStart = (emailAndPassword) => ({
  type: raUserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
})

export const signInSuccess = (user) => ({
  type: raUserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
})

export const signInFailure = (error) => ({
  type: raUserActionTypes.SIGN_IN_FAILURE,
  payload: error,
})

export const signOutStart = () => ({
  type: raUserActionTypes.SIGN_OUT_START,
})

export const signOutSuccess = () => ({
  type: raUserActionTypes.SIGN_OUT_SUCCESS,
})

export const signOutFailure = (error) => ({
  type: raUserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
})
