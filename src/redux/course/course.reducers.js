import { createReducer } from '../utils/reducer.utils';
import { FETCH_COURSE } from './course.constants';

const initialState = {
  courses: [],
};

const fetchCourses = (state, payload) => {
  return {
    ...state,
    courses: payload.courses,
  };
};

export default createReducer(initialState, {
  [FETCH_COURSE]: fetchCourses,
});
