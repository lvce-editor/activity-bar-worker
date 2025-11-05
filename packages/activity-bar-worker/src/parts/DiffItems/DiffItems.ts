import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const isEqual = (oldState: ActivityBarState, newState: ActivityBarState): boolean => {
  return (
    oldState.focusedIndex === newState.focusedIndex &&
    oldState.activityBarItems === newState.activityBarItems &&
    oldState.updateProgress === newState.updateProgress &&
    oldState.updateState === newState.updateState
  )
}
