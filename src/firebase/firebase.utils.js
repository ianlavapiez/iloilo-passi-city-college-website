import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCAlfWz6ZLhzh0xsi70cH0-dUoHT-7EraM',
  authDomain: 'brainhub-9be8a.firebaseapp.com',
  databaseURL: 'https://brainhub-9be8a.firebaseio.com',
  projectId: 'brainhub-9be8a',
  storageBucket: 'brainhub-9be8a.appspot.com',
  messagingSenderId: '3981955536',
  appId: '1:3981955536:web:5cbab7e5ceeb08e68529d5',
  measurementId: 'G-XM6ZMVTWXV',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export default firebase
