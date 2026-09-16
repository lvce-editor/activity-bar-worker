import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const handleDragLeave = (state: ActivityBarState): ActivityBarState => {
  const { dropIndicator } = state
  if (!dropIndicator) {
    return state
  }
  return {
    ...state,
    dropIndicator: undefined,
  }
}
