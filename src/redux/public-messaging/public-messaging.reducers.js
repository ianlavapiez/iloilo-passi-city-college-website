import { createReducer } from '../utils/reducer.utils'
import { FETCH_PUBLIC_MESSAGING } from './public-messaging.constants'

const initialState = {
  messages: [],
}

const fetchPublicMessaging = (state, payload) => {
  return {
    ...state,
    messages: payload.messages,
  }
}

export default createReducer(initialState, {
  [FETCH_PUBLIC_MESSAGING]: fetchPublicMessaging,
})
