import { createReducer } from '../utils/reducer.utils'

import { FETCH_USER } from './auth.constants'

const initialState = {
  authenticated: false,
  currentUser: null,
}

const fetchUser = (state, payload) => {
  return {
    ...state,
    currentUser: payload.user,
  }
}

export default createReducer(initialState, {
  [FETCH_USER]: fetchUser,
})
