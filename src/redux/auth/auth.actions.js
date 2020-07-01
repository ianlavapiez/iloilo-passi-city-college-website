import firebase, { firestore, auth } from '../../firebase/firebase.utils'

import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from '../async/async.actions'

import { FETCH_USER } from './auth.constants'
import { fireAlert } from '../../components/common/confirmation-message/confirmation-message.component'

export const raLogin = (credentials) => {
  return async (dispatch) => {
    const { email, password } = credentials
    const userRef = firestore.collection('ra_users')

    try {
      dispatch(asyncActionStart())
      await firebase.auth().signInWithEmailAndPassword(email, password)

      let userUid = firebase.auth().currentUser.uid
      let querySnapshot = await userRef.get()

      let user = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return user
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        if (querySnapshot.docs[i].id === userUid) {
          let newUser = {
            ...querySnapshot.docs[i].data(),
            id: querySnapshot.docs[i].id,
          }

          user.push(newUser)
        }
      }

      dispatch({
        type: FETCH_USER,
        payload: { user },
      })

      dispatch(asyncActionFinish())

      if (user[0].type === 'ra') {
        return true
      } else {
        return false
      }
    } catch (error) {
      dispatch(asyncActionFinish())
      fireAlert('Something went wrong.', 'warning')
      return false
    }
  }
}

export const adminLogin = (credentials) => {
  return async (dispatch) => {
    const { email, password } = credentials
    const userRef = firestore
      .collection('admin_users')
      .where('email', '==', email)

    try {
      dispatch(asyncActionStart())
      await firebase.auth().signInWithEmailAndPassword(email, password)

      let userUid = firebase.auth().currentUser.uid
      let querySnapshot = await userRef.get()

      let user = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return user
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        if (querySnapshot.docs[i].id === userUid) {
          let newUser = {
            ...querySnapshot.docs[i].data(),
            id: querySnapshot.docs[i].id,
          }

          user.push(newUser)
        }
      }

      dispatch({
        type: FETCH_USER,
        payload: { user },
      })

      dispatch(asyncActionFinish())

      if (user[0].type === 'admin') {
        return true
      } else {
        return false
      }
    } catch (error) {
      dispatch(asyncActionFinish())
      fireAlert('Something went wrong.', 'warning')
      return false
    }
  }
}

export const studentLogin = (credentials) => {
  return async (dispatch) => {
    const { email, password } = credentials
    const userRef = firestore.collection('users')

    try {
      dispatch(asyncActionStart())
      await firebase.auth().signInWithEmailAndPassword(email, password)

      let userUid = firebase.auth().currentUser.uid
      let querySnapshot = await userRef.get()

      let user = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return user
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        if (querySnapshot.docs[i].id === userUid) {
          let newUser = {
            ...querySnapshot.docs[i].data(),
            id: querySnapshot.docs[i].id,
          }

          user.push(newUser)
        }
      }

      dispatch({
        type: FETCH_USER,
        payload: { user },
      })

      dispatch(asyncActionFinish())

      if (user[0].type === 'student' && user[0].verified === true) {
        return true
      } else {
        fireAlert(
          'You are not yet verified. Please contact the Brainhub administrator.',
          'warning'
        )
        return false
      }
    } catch (error) {
      dispatch(asyncActionFinish())
      fireAlert('Something went wrong.', 'warning')
      return false
    }
  }
}

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    const {
      email,
      password,
      displayName,
      address,
      contact,
      course,
      program,
    } = user

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    let userId = createdUser.user.uid
    let newUser = {
      displayName,
      address,
      contact,
      course,
      program,
      userId,
      email,
      created: new Date(),
      verified: false,
      softDelete: false,
      type: 'student',
    }

    await firestore
      .collection('users')
      .doc(userId)
      .set({ ...newUser })
      .then(() =>
        fireAlert(
          'Your application has been sent! Please wait for your account to be verified by the Brainhub team!',
          'success'
        )
      )
      .catch((error) => {
        fireAlert(error.message, 'warning')
        return false
      })

    dispatch(asyncActionFinish())
    return true
  } catch (error) {
    dispatch(asyncActionError())
    fireAlert(error.message, 'warning')
    return false
  }
}

export const updateStudentProfile = (student) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    let ref = firestore.collection('users').doc(student.id)
    let batch = firestore.batch()

    batch.update(ref, student)

    await batch
      .commit()
      .then(() => {
        fireAlert(
          'The selected student details has been successfully updated!',
          'success'
        )
      })
      .then(() => {
        dispatch(asyncActionFinish())
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch((error) => {
        console.log(error)
        fireAlert('Oops! Something went wrong!', 'error')
      })
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}

export const getStudentUserDetails = (userId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())

    let ref = firestore
      .collection('users')
      .where('userId', '==', userId)
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let user = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return (window.location.href = '/student/login')
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let newUser = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        user.push(newUser)
      }
      dispatch({ type: FETCH_USER, payload: { user } })
      dispatch(asyncActionFinish())

      localStorage.setItem('type', user[0].type)

      if (user && user[0]) {
        if (user[0].type !== 'student') {
          window.location.href = '/student/login'
        }
      }
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const getRAUserDetails = (userId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())

    let ref = firestore
      .collection('ra_users')
      .where('userId', '==', userId)
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let user = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return (window.location.href = '/ra/login')
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let newUser = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        user.push(newUser)
      }
      dispatch({ type: FETCH_USER, payload: { user } })
      dispatch(asyncActionFinish())

      localStorage.setItem('type', user[0].type)

      if (user && user[0]) {
        if (user[0].type !== 'ra') {
          window.location.href = '/ra/login'
        }
      }
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const getAdminUserDetails = (userId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())

    let ref = firestore
      .collection('admin_users')
      .where('userId', '==', userId)
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let user = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return (window.location.href = '/admin/login')
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let newUser = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        user.push(newUser)
      }
      dispatch({ type: FETCH_USER, payload: { user } })
      dispatch(asyncActionFinish())

      localStorage.setItem('type', user[0].type)

      if (user && user[0]) {
        if (user[0].type !== 'admin') {
          window.location.href = '/admin/login'
        }
      }
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const resetPassword = (email) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()

  try {
    dispatch(asyncActionStart())

    await firebase.auth().sendPasswordResetEmail(email)

    dispatch(asyncActionFinish())

    return true
  } catch (error) {
    dispatch(asyncActionError())
    console.log(error)

    return error
  }
}

export const updatePassword = (password) => async (dispatch) => {
  const user = firebase.auth().currentUser

  try {
    dispatch(asyncActionStart())
    await user
      .updatePassword(password)
      .then(() => {
        fireAlert(
          'Successfully changed your password, please do login again.',
          'success'
        )
      })
      .then(() => {
        dispatch(asyncActionFinish())
        auth.signOut()
        setTimeout(() => {
          window.location.href = '/student/login'
        }, 2000)
      })

    dispatch(asyncActionFinish())
  } catch (error) {
    fireAlert(error.message, 'warning')
    dispatch(asyncActionError())
  }
}
