import { createSelector } from 'reselect'

const selectRaUser = (state) => state.raUser

export const selectCurrentUser = createSelector(
  [selectRaUser],
  (raUser) => raUser.currentUser
)

export const selectError = createSelector(
  [selectRaUser],
  (raUser) => raUser.error
)

export const selectIsLoading = createSelector(
  [selectRaUser],
  (raUser) => raUser.isLoading
)
