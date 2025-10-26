import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const isEqual = (oldState: ActivityBarState, newState: ActivityBarState): boolean => {
  return oldState.focusedIndex === newState.focusedIndex
}
