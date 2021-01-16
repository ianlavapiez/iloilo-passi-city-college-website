import {
  AUTHENTICATED_FALSE,
  AUTHENTICATED_TRUE,
} from './authenticated.constants';

export const authenticatedTrue = () => {
  return async (dispatch) => {
    dispatch({ type: AUTHENTICATED_TRUE });
  };
};

export const authenticatedFalse = () => {
  return async (dispatch) => {
    dispatch({ type: AUTHENTICATED_FALSE });
  };
};
