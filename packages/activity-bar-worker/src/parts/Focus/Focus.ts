import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as FocusId from '../FocusId/FocusId.ts'

export const focus = (state: ActivityBarState): ActivityBarState => {
  if (state.focus) {
    return state
  }
  return {
    ...state,
    focus: FocusId.List,
  }
}
