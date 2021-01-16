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
import { FETCH_COURSE } from './course.constants';

import { fireAlert } from '../../components/common/confirmation-message/confirmation-message.component';

export const fetchCourse = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    const ref = firestore
      .collection('course')
      .where('softDelete', '==', false)
      .orderBy('created', 'desc');

    try {
      let querySnapshot = await ref.get();

      let courses = [];

      if (querySnapshot.docs.length === 0) {
        dispatch(asyncActionFinish());

        return courses;
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let course = {
          ...querySnapshot.docs[i].data(),
          id: querySnapshot.docs[i].id,
        };

        courses.push(course);
      }
      dispatch({ type: FETCH_COURSE, payload: { courses } });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const addCourse = (file, details) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const uploadTask = storage.ref(`/course/${file.name}`).put(file);

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
          .ref('course')
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
              .add('course', newDetail)
              .then(() => {
                fireAlert(
                  'The course details has been successfully added!',
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

export const updateCourse = (file, details) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const firebaseFirestore = firebase.firestore();

  if (file) {
    const uploadTask = storage.ref(`/course/${file.name}`).put(file);

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
            .ref('course')
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
                .collection('course')
                .doc(details.id);
              let batch = firebaseFirestore.batch();

              batch.update(detailsDocRef, newDetails);

              await batch
                .commit()
                .then(() => {
                  fireAlert(
                    'The selected course details has been successfully updated!',
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
        .collection('course')
        .doc(details.id);
      let batch = firebaseFirestore.batch();

      batch.update(detailsDocRef, details);

      await batch
        .commit()
        .then(() => {
          fireAlert(
            'The selected course details has been successfully updated!',
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

export const softDeleteCourse = (details) => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();

    try {
      dispatch(asyncActionStart());
      let docRef = firestore.collection('course').doc(details.id);
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
          'The selected course details has been successfully deleted!',
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
