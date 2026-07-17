import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusNext = (state: ActivityBarState): ActivityBarState => {
  const { filteredItems, focusedIndex } = state
  const lastIndex = filteredItems.length - 1
  if (focusedIndex >= lastIndex) {
    return state
  }
  return focusIndex(state, focusedIndex + 1)
}
