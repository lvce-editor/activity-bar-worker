import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const isEqual = (oldState: ActivityBarState, newState: ActivityBarState): boolean => {
  return (
    oldState.activityBarItems === newState.activityBarItems &&
    oldState.filteredItems === newState.filteredItems &&
    oldState.focusedIndex === newState.focusedIndex &&
    oldState.updateProgress === newState.updateProgress &&
    oldState.updateState === newState.updateState
  )
}
