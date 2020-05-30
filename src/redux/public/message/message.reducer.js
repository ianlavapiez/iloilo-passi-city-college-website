import { messageActionTypes } from './message.types'

const INITIAL_STATE = {
  message: null,
  isLoading: false,
  isSuccessful: false,
  error: null,
}

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case messageActionTypes.SEND_MESSAGE_START:
      return {
        ...state,
        isLoading: true,
      }
    case messageActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        error: null,
      }
    case messageActionTypes.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isSuccessful: false,
        isLoading: false,
      }
    default:
      return state
  }
}

export default messageReducer
