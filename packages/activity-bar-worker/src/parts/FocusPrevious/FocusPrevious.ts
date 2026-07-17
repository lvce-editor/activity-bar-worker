import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusPrevious = (state: ActivityBarState): ActivityBarState => {
  const { focusedIndex } = state
  if (focusedIndex <= 0) {
    return state
  }
  return focusIndex(state, focusedIndex - 1)
}
