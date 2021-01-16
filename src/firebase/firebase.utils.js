import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCudjirGb3_ngxInDWR0FaNkPTNDlxLwfA',
  authDomain: 'iloilopassi-b002e.firebaseapp.com',
  projectId: 'iloilopassi-b002e',
  storageBucket: 'iloilopassi-b002e.appspot.com',
  messagingSenderId: '569367752305',
  appId: '1:569367752305:web:4cc481be3a69863dc8b5d0',
  measurementId: 'G-8EK6ZZHK63',
};

export const createData = (data) => {
  return {
    ...data,
    softDelete: false,
    created: new Date(),
  };
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
