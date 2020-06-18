import { firestore } from '../../firebase/firebase.utils'
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions'
import {
  FETCH_STUDENT_USER,
  FETCH_SPECIFIC_STUDENT_USER,
} from './students.constants'

import { fireAlert } from '../../components/common/confirmation-message/confirmation-message.component'

export const getStudents = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('users')
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let students = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return students
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let student = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        students.push(student)
      }
      dispatch({ type: FETCH_STUDENT_USER, payload: { students } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const getStudentDetails = (studentId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('users')
      .where('userId', '==', studentId)
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let students = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return students
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let student = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        students.push(student)
      }
      dispatch({ type: FETCH_SPECIFIC_STUDENT_USER, payload: { students } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const verifyStudents = (student) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    let ref = firestore.collection('users').doc(student.id)
    let batch = firestore.batch()

    batch.update(ref, student)

    await batch
      .commit()
      .then(() => {
        fireAlert(
          'The selected student details has been successfully verified!',
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
