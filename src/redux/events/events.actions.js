import firebase, {
  createData,
  firestore,
  storage,
} from '../../firebase/firebase.utils';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions';
import { FETCH_EVENTS } from './events.constants';

import { fireAlert } from '../../components/common/confirmation-message/confirmation-message.component';

export const fetchEvents = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    const ref = firestore
      .collection('events')
      .where('softDelete', '==', false)
      .orderBy('created', 'desc');

    try {
      let querySnapshot = await ref.get();

      let events = [];

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish());

        return events;
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let event = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        };

        events.push(event);
      }
      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const addEvents = (file, details) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const uploadTask = storage.ref(`/events/${file.name}`).put(file);

    dispatch(asyncActionStart());

    let newDetails;

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (err) => {
        dispatch(asyncActionFinish());
        throw Error('Something went wrong.');
      },
      () => {
        storage
          .ref('events')
          .child(file.name)
          .getDownloadURL()
          .then((imageUrl) => {
            newDetails = {
              ...details,
              imageUrl,
            };
          })
          .then(function () {
            const newDetail = createData(user, newDetails);
            firestore
              .add('events', newDetail)
              .then(() => {
                fireAlert(
                  'The event details has been successfully added!',
                  'success'
                );
              })
              .then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              })
              .catch((error) => {
                console.log(error);
                fireAlert('Oops! Something went wrong!', 'error');
              });

            dispatch(asyncActionFinish());
          });
      }
    );
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const updateEvents = (file, details) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const firebaseFirestore = firebase.firestore();

  if (file) {
    const uploadTask = storage.ref(`/events/${file.name}`).put(file);

    try {
      dispatch(asyncActionStart());
      let newDetails;

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          dispatch(asyncActionFinish());
          throw Error('Something went wrong.');
        },
        () => {
          storage
            .ref('events')
            .child(file.name)
            .getDownloadURL()
            .then((imageUrl) => {
              newDetails = {
                ...details,
                imageUrl,
              };
            })
            .then(async function () {
              let detailsDocRef = firebaseFirestore
                .collection('events')
                .doc(details.id);
              let batch = firebaseFirestore.batch();

              batch.update(detailsDocRef, newDetails);

              await batch
                .commit()
                .then(() => {
                  fireAlert(
                    'The selected event details has been successfully updated!',
                    'success'
                  );
                })
                .then(() => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                })
                .catch(() => {
                  fireAlert('Oops! Something went wrong!', 'error');
                });

              dispatch(asyncActionFinish());
            });
        }
      );
    } catch (error) {
      dispatch(asyncActionError());
    }
  } else {
    dispatch(asyncActionStart());

    try {
      let detailsDocRef = firebaseFirestore
        .collection('events')
        .doc(details.id);
      let batch = firebaseFirestore.batch();

      batch.update(detailsDocRef, details);

      await batch
        .commit()
        .then(() => {
          fireAlert(
            'The selected event details has been successfully updated!',
            'success'
          );
        })
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch(() => {
          fireAlert('Oops! Something went wrong!', 'error');
        });

      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
    }
  }
};

export const softDeleteEvent = (details) => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();

    try {
      dispatch(asyncActionStart());
      let docRef = firestore.collection('events').doc(details.id);
      let batch = firestore.batch();

      let newDetails = {
        ...details,
        softDelete: true,
      };

      batch.update(docRef, newDetails);

      await batch.commit();

      if (!batch._committed) {
        fireAlert('Oops! Something went wrong!', 'error');
      } else {
        fireAlert(
          'The selected event details has been successfully deleted!',
          'success'
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};
