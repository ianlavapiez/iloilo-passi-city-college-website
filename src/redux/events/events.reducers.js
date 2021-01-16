import { createReducer } from '../utils/reducer.utils';
import { FETCH_EVENTS } from './events.constants';

const initialState = {
  events: [],
};

const fetchEvents = (state, payload) => {
  return {
    ...state,
    events: payload.events,
  };
};

export default createReducer(initialState, {
  [FETCH_EVENTS]: fetchEvents,
});
