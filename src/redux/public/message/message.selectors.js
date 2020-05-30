import { createSelector } from 'reselect'

const selectMessage = (state) => state.publicMessage

export const selectIsMessageLoading = createSelector(
  [selectMessage],
  (message) => message.isLoading
)
