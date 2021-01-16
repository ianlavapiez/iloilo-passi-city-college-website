import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import asyncReducer from './async/async.reducer';
import authReducer from './auth/auth.reducer';
import courseReducer from './course/course.reducers';
import eventsReducer from './events/events.reducers';
import facilitiesReducer from './facilities/facilities.reducers';
import authenticatedReducers from './authenticated/authenticated.reducers';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  async: asyncReducer,
  auth: authReducer,
  courses: courseReducer,
  events: eventsReducer,
  facilities: facilitiesReducer,
  isAuthenticated: authenticatedReducers,
});

export default rootReducer;
