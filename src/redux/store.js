import { createStore, applyMiddleware, compose } from 'redux'
import { getFirebase } from 'react-redux-firebase'
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
      reduxFirestore(firebase)
    )
  } else {
    composedEnhancer = compose(applyMiddleware(...middlewares))
  }

  const store = createStore(rootReducer, composedEnhancer)

  return store
}
