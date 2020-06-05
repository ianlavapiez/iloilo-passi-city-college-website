import { firestore } from '../../firebase/firebase.utils'
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions'
import { FETCH_STUDENT_PAYMENTS } from './payments.constants'

import { fireAlert } from '../../components/common/confirmation-message/confirmation-message.component'

export const getPayments = (raId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('payments')
      .where('raId', '==', raId)
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let payments = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return payments
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let payment = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        payments.push(payment)
      }
      dispatch({ type: FETCH_STUDENT_PAYMENTS, payload: { payments } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const addPayments = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    data.softDelete = false
    data.paymentTrail = []
    data.created = new Date()

    await firestore
      .collection('payments')
      .add(data)
      .then(() => {
        fireAlert('The payment details has been successfully added!', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .then(() => {
        dispatch(asyncActionFinish())
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

export const checkIfPaymentExists = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    const { schoolYear, program, studentId } = data

    const ref = firestore
      .collection('payments')
      .where('softDelete', '==', false)
      .where('schoolYear', '==', schoolYear)
      .where('program', '==', program)
      .where('studentId', '==', studentId)

    let querySnapshot = await ref.get()

    if (querySnapshot.empty) {
      dispatch(asyncActionFinish())
      return true
    } else {
      dispatch(asyncActionError())
      fireAlert(
        'There is already an existing payment details to this student. Please re-check your details.',
        'warning'
      )
      return false
    }
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
    return error
  }
}
