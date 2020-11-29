import cuid from 'cuid'

import firebase, { firestore } from '../../firebase/firebase.utils'
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions'
import {
  FETCH_STUDENT_PAYMENTS,
  FETCH_STUDENT_PAYMENT_TRAIL,
  FETCH_SPECIFIC_STUDENT_PAYMENT,
  FETCH_STUDENT_UNVERIFIED_PAYMENT_TRAIL,
  FETCH_ADMIN_PAYMENTS,
} from './payments.constants'

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
        let status

        if (
          querySnapshot.docs[i].data().accumulatedPayment ===
          querySnapshot.docs[i].data().fee
        ) {
          status = 'fully paid'
        } else {
          status = 'has balance'
        }

        let payment = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
          status,
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

export const getAdminPayments = (raId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('payments')
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
      dispatch({ type: FETCH_ADMIN_PAYMENTS, payload: { payments } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const getStudentPayments = (studentId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('payments')
      .where('studentId', '==', studentId)
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
      dispatch({ type: FETCH_SPECIFIC_STUDENT_PAYMENT, payload: { payments } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const getUnverifiedPaymentTrail = (raId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    console.log(raId)
    const ref = firestore
      .collection('payment_trail')
      .where('raId', '==', raId)
      .where('softDelete', '==', false)
      .where('verified', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let paymentTrail = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return paymentTrail
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let newData = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        paymentTrail.push(newData)
      }

      console.log(paymentTrail)
      dispatch({
        type: FETCH_STUDENT_UNVERIFIED_PAYMENT_TRAIL,
        payload: { paymentTrail },
      })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const getPaymentTrail = (paymentId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('payment_trail')
      .where('paymentId', '==', paymentId)
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let paymentTrail = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return paymentTrail
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let newData = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        paymentTrail.push(newData)
      }
      dispatch({ type: FETCH_STUDENT_PAYMENT_TRAIL, payload: { paymentTrail } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
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

export const addPayments = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    data.softDelete = false
    data.created = new Date()
    data.accumulatedPayment = 0

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
        dispatch(asyncActionError())
      })
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}

export const addPaymentsFromRA = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    data.softDelete = false
    data.created = new Date()
    data.verified = true
    data.referenceNo = cuid()

    await firestore
      .collection('payment_trail')
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
        dispatch(asyncActionError())
      })
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}

export const updatePaymentDetails = (payment) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    let docRef = firestore.collection('payments').doc(payment.id)
    let batch = firestore.batch()

    batch.update(docRef, payment)

    await batch
      .commit()
      .then(() => {
        fireAlert(
          'The selected payment details has been successfully updated!',
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
        dispatch(asyncActionError())
        console.log(error)
        fireAlert('Oops! Something went wrong!', 'error')
      })
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}

export const deletePayment = (payment) => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart())
      let docRef = firestore.collection('payments').doc(payment.id)
      let batch = firestore.batch()

      let newData = {
        ...payment,
        softDelete: true,
      }

      batch.update(docRef, newData)

      await batch
        .commit()
        .then(() => {
          fireAlert(
            'The selected payment details has been successfully deleted!',
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
      dispatch(asyncActionError())
      console.log(error)
    }
  }
}

export const uploadPayment = (file, data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    let newData
    let uniqueKey = cuid()
    let storageRef = await firebase
      .storage()
      .ref('student_payments')
      .child(uniqueKey)

    await storageRef.putString(file, 'data_url').then(function (snapshot) {
      storageRef
        .getDownloadURL()
        .then(function (url) {
          newData = {
            ...data,
            imageUrl: url,
            created: new Date(),
            softDelete: false,
            verified: false,
          }
        })
        .then(function () {
          firestore
            .collection('payment_trail')
            .add(newData)
            .then(() => {
              fireAlert(
                'The payment details have been successfully uploaded!',
                'success'
              )
            })
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 2000)
              dispatch(asyncActionFinish())
            })
            .catch((error) => {
              console.log(error)
              fireAlert('Oops! Something went wrong!', 'error')
              dispatch(asyncActionError())
            })
        })
    })
  } catch (error) {
    dispatch(asyncActionError())
    console.log(error.message)
    console.log(error)
  }
}

export const updateUploadedPayment = (file, data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    let newData
    let uniqueKey = cuid()
    let storageRef = await firebase
      .storage()
      .ref('student_payments')
      .child(uniqueKey)

    await storageRef.putString(file, 'data_url').then(function (snapshot) {
      storageRef
        .getDownloadURL()
        .then(function (url) {
          newData = {
            ...data,
            imageUrl: url,
          }
        })
        .then(async function () {
          let docRef = firestore.collection('payment_trail').doc(data.id)
          let batch = firestore.batch()

          batch.update(docRef, newData)

          await batch
            .commit()
            .then(() => {
              fireAlert(
                'The selected payment details has been successfully updated!',
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
              dispatch(asyncActionError())
              console.log(error)
              fireAlert('Oops! Something went wrong!', 'error')
            })
        })
    })
  } catch (error) {
    dispatch(asyncActionError())
    console.log(error.message)
    console.log(error)
  }
}

export const deleteUploadedPayment = (payment) => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart())
      let docRef = firestore.collection('payment_trail').doc(payment.id)
      let batch = firestore.batch()

      let newData = {
        ...payment,
        softDelete: true,
      }

      batch.update(docRef, newData)

      await batch
        .commit()
        .then(() => {
          fireAlert(
            'The selected payment details has been successfully deleted!',
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
      dispatch(asyncActionError())
      console.log(error)
    }
  }
}

export const updateAccumulatedPayment = (payment) => async (dispatch) => {
  try {
    let docRef = firestore.collection('payments').doc(payment.id)
    let batch = firestore.batch()

    batch.update(docRef, payment)

    await batch.commit()
  } catch (error) {
    console.log(error)
    dispatch(asyncActionError())
  }
}

export const verifyPaymentDetails = (payment) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    let docRef = firestore.collection('payment_trail').doc(payment.id)
    let batch = firestore.batch()

    let newData = {
      ...payment,
      verified: true,
    }

    batch.update(docRef, newData)

    await batch
      .commit()
      .then(() => {
        fireAlert(
          'The selected payment details has been successfully verified!',
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
    dispatch(asyncActionError())
    console.log(error)
  }
}

export const unVerifyPaymentDetails = (payment) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    let docRef = firestore.collection('payment_trail').doc(payment.id)
    await docRef
      .delete()
      .then(() => {
        fireAlert(
          'The selected payment details has been successfully deleted!',
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
    dispatch(asyncActionError())
    console.log(error)
  }
}
