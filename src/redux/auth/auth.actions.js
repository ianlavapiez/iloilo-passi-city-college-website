import firebase, { firestore } from '../../firebase/firebase.utils'

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
      fireAlert(error.message, 'warning')
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
        return false
      }
    } catch (error) {
      dispatch(asyncActionFinish())
      fireAlert(error.message, 'warning')
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
      .catch((error) => fireAlert(error.message, 'warning'))

    dispatch(asyncActionFinish())
  } catch (error) {
    dispatch(asyncActionError())
    fireAlert(error.message, 'warning')
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

export const getUserDetails = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    // const userId = firebase.auth().currentUser.uid

    const ref = firestore
      .collection('users')
      .where('userId', '==', 'Th1Vw7kJjjVh9nfSQ0Z3ATrYQ7s1')
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let user = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return user
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

export const updatePassword = (credentials) => async (dispatch) => {
  const user = firebase.auth().currentUser

  try {
    dispatch(asyncActionStart())
    await user.updatePassword(credentials.password)

    dispatch(asyncActionFinish())
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}

export const getFullNameVerification = (fullname) => {
  return async (dispatch) => {
    const tbiRef = firestore
      .collection('tbi_users')
      .where('tbiName', '==', fullname)

    try {
      dispatch(asyncActionStart())
      let querySnapshot = await tbiRef.get()

      if (querySnapshot.empty === false) {
        dispatch(asyncActionFinish())

        return false
      } else {
        return true
      }
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}
