import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusNone = (state: ActivityBarState): ActivityBarState => {
  const { focusedIndex } = state
  if (focusedIndex === -1) {
    return state
  }
  return focusIndex(state, -1)
}
