import { createStore, applyMiddleware, compose } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import firebase from '../firebase/firebase.utils'
import rootReducer from './root-reducer'

export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })]

  let composedEnhancer

  if (process.env.NODE_ENV === 'development') {
    composedEnhancer = composeWithDevTools(
      applyMiddleware(...middlewares),
      reactReduxFirebase(firebase, {
        userProfile: 'users',
        attachAuthIsReady: true,
      }),
      reduxFirestore(firebase)
    )
  } else {
    composedEnhancer = compose(
      applyMiddleware(...middlewares),
      reactReduxFirebase(firebase, {
        userProfile: 'users',
        attachAuthIsReady: true,
      }),
      reduxFirestore(firebase)
    )
  }

  const store = createStore(rootReducer, composedEnhancer)

  return store
}
