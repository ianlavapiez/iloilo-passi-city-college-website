import { firestore } from '../../firebase/firebase.utils'
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions'
import {
  FETCH_RA_CLASS,
  FETCH_STUDENT_CLASS,
  FETCH_ADMIN_CLASS,
} from './class.constants'

import { fireAlert } from '../../components/common/confirmation-message/confirmation-message.component'

export const getRAClasses = (raId) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('classes')
      .where('raId', '==', raId)
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let classes = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return classes
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let newClass = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        classes.push(newClass)
      }
      dispatch({ type: FETCH_RA_CLASS, payload: { classes } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const getStudentClasses = (course, program) => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('classes')
      .where('course', '==', course)
      .where('program', '==', program)
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let classes = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return classes
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let newClass = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        classes.push(newClass)
      }
      dispatch({ type: FETCH_STUDENT_CLASS, payload: { classes } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const getClassesForAdmin = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    const ref = firestore
      .collection('classes')
      .where('softDelete', '==', false)
      .orderBy('created', 'desc')

    try {
      let querySnapshot = await ref.get()

      let classes = []

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish())

        return classes
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let newClass = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        }

        classes.push(newClass)
      }
      dispatch({ type: FETCH_ADMIN_CLASS, payload: { classes } })
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

export const checkIfClassExists = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    const { course, date, program, professor, subject } = data

    const ref = firestore
      .collection('classes')
      .where('softDelete', '==', false)
      .where('course', '==', course)
      .where('program', '==', program)
      .where('date', '==', date)
      .where('professor', '==', professor)
      .where('subject', '==', subject)

    let querySnapshot = await ref.get()

    if (querySnapshot.empty) {
      dispatch(asyncActionFinish())
      return true
    } else {
      dispatch(asyncActionError())
      fireAlert(
        'There is already an existing class details. Please re-check your details.',
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

export const addClassRecord = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    data.softDelete = false
    data.created = new Date()

    await firestore
      .collection('classes')
      .add(data)
      .then(() => {
        fireAlert('The class details has been successfully added!', 'success')
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

export const updateClassRecord = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    let docRef = firestore.collection('classes').doc(data.id)
    let batch = firestore.batch()

    batch.update(docRef, data)

    await batch
      .commit()
      .then(() => {
        fireAlert(
          'The selected class details has been successfully updated!',
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

export const deleteClassRecord = (data) => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart())
      let docRef = firestore.collection('classes').doc(data.id)
      let batch = firestore.batch()

      let newData = {
        ...data,
        softDelete: true,
      }

      batch.update(docRef, newData)

      await batch
        .commit()
        .then(() => {
          fireAlert(
            'The selected class details has been successfully deleted!',
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

export const changeClassStatus = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())
    let docRef = firestore.collection('classes').doc(data.id)
    let batch = firestore.batch()

    let newData = {
      ...data,
      status: data.status,
    }

    batch.update(docRef, newData)

    await batch
      .commit()
      .then(() => {
        fireAlert(
          'The selected class status details has been successfully updated!',
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
