import { createSelector } from 'reselect'

const selectStudentUsers = (state) => state.students

export const selectUnverifiedStudents = createSelector(
  [selectStudentUsers],
  (students) =>
    students.students.filter(
      (student) => student.type === 'student' && student.verified === false
    )
)

export const selectIsSuccessful = createSelector(
  [selectStudentUsers],
  (students) => students.isSuccessful
)

export const selectVerifiedStudents = createSelector(
  [selectStudentUsers],
  (students) =>
    students.students.filter(
      (student) => student.type === 'student' && student.verified === true
    )
)

export const selectIsStudentsLoaded = createSelector(
  [selectStudentUsers],
  (students) => !!students.students
)
