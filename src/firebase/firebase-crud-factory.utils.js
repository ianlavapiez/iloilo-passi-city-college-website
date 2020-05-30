import cuid from 'cuid'

import { firestore } from './firebase.utils'
import { fireAlert } from '../components/common/confirmation-message/confirmation-message.component'

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
          .then(() => fireAlert('The data has been added.', 'success'))
          .catch(() => fireAlert('Error occurred.', 'warning'))
      } catch (error) {
        console.log(error)
      }
    }

    return isAdded
  } catch (error) {
    console.log(error)
  }
}

export const updateData = async (collectionName, data) => {
  try {
    const dataRef = firestore.collection(collectionName).doc(data.id)
    let batch = firestore.batch()

    batch.update(dataRef, data)
    await batch
      .commit()
      .then(() => fireAlert('The data has been updated.', 'success'))
      .catch(() => fireAlert('Error occurred.', 'warning'))
  } catch (error) {
    console.log(error)
  }
}
