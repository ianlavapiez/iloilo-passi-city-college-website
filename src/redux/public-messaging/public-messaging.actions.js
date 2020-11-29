import { firestore } from '../../firebase/firebase.utils'
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions'

import { fireAlert } from '../../components/common/confirmation-message/confirmation-message.component'

export const addMessage = (data) => async (dispatch) => {
  try {
    dispatch(asyncActionStart())

    await firestore
      .collection('message')
      .add(data)
      .then(() => {
        fireAlert('The message details has been successfully sent!', 'success')
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
