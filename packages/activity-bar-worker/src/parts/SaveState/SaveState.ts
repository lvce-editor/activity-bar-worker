import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: ActivityBarState): SavedState => {
  const { currentViewletId } = state
  return {
    currentViewletId,
  }
}
