import { createReducer } from '../utils/reducer.utils'

import { FETCH_USER, FETCH_ADMIN_USER } from './auth.constants'

const initialState = {
  authenticated: false,
  currentUser: null,
  adminUser: [],
}

const fetchUser = (state, payload) => {
  return {
    ...state,
    currentUser: payload.user,
  }
}

const fetchAdminUser = (state, payload) => {
  return {
    ...state,
    adminUser: payload.user,
  }
}

export default createReducer(initialState, {
  [FETCH_USER]: fetchUser,
  [FETCH_ADMIN_USER]: fetchAdminUser,
})
