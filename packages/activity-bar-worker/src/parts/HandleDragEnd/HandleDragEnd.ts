import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const handleDragEnd = (state: ActivityBarState): ActivityBarState => {
  if (!state.draggedItemId && !state.dropIndicator) {
    return state
  }
  const { draggedItemId: _draggedItemId, dropIndicator: _dropIndicator, ...rest } = state
  return rest
}
