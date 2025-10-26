import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusFirst = (state: ActivityBarState): ActivityBarState => {
  return focusIndex(state, -1)
}
