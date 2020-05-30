import { messageActionTypes } from './message.types'

export const sendMessageStart = (data) => ({
  type: messageActionTypes.SEND_MESSAGE_START,
  payload: data,
})

export const sendMessageFailure = (error) => ({
  type: messageActionTypes.SEND_MESSAGE_FAILURE,
  payload: error,
})

export const sendMessageSuccess = () => ({
  type: messageActionTypes.SEND_MESSAGE_SUCCESS,
})
