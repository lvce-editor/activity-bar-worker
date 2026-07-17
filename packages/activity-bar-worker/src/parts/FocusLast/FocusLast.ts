import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusLast = (state: ActivityBarState): ActivityBarState => {
  const { filteredItems } = state
  return focusIndex(state, filteredItems.length - 1)
}
