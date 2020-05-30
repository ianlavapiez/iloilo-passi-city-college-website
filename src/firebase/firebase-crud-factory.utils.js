import cuid from 'cuid'

import { firestore } from './firebase.utils'

const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })

  return transformedCollection
}

export const retrieveData = async (collectionName) => {
  try {
    const dataRef = firestore.collection(collectionName)
    const snapshot = await dataRef.get()

    return convertCollectionsSnapshotToMap(snapshot)
  } catch (error) {
    console.log(error)
  }
}

export const addData = async (collectionName, data) => {
  try {
    let isAdded
    const id = cuid()
    const dataRef = firestore.doc(`${collectionName}/${id}`)
    const snapshot = await dataRef.get()

    if (!snapshot.exists) {
      const createdAt = new Date()

      try {
        dataRef
          .set({ ...data, createdAt })
          .then(() => (isAdded = true))
          .catch(() => (isAdded = false))
      } catch (error) {
        console.log(error)
      }
    }

    return isAdded
  } catch (error) {
    console.log(error)
  }
}
