import { createReducer } from '../utils/reducer.utils';
import { FETCH_FACILITIES } from './facilities.constants';

const initialState = {
  facilities: [],
};

const fetchFacilities = (state, payload) => {
  return {
    ...state,
    facilities: payload.facilities,
  };
};

export default createReducer(initialState, {
  [FETCH_FACILITIES]: fetchFacilities,
});
