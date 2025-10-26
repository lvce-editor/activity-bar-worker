import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const focusNext = (state: ActivityBarState): ActivityBarState => {
  return focusIndex(state, -1)
}
