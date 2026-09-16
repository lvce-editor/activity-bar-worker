import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const setDragAndDropEnabled = (state: ActivityBarState, enabled: boolean): ActivityBarState => {
  const { dragAndDropEnabled } = state
  if (dragAndDropEnabled === enabled) {
    return state
  }
  return {
    ...state,
    dragAndDropEnabled: enabled,
  }
}
