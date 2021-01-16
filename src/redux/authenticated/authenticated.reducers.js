import { createReducer } from '../utils/reducer.utils';
import {
  AUTHENTICATED_FALSE,
  AUTHENTICATED_TRUE,
} from './authenticated.constants';

const initialState = {
  isAuthenticated: false,
};

const authenticatedTrue = (state) => {
  return {
    ...state,
    isAuthenticated: true,
  };
};

const authenticatedFalse = (state) => {
  return {
    ...state,
    isAuthenticated: false,
  };
};

export default createReducer(initialState, {
  [AUTHENTICATED_TRUE]: authenticatedTrue,
  [AUTHENTICATED_FALSE]: authenticatedFalse,
});
