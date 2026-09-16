import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { isMovableActivityBarItem } from '../IsMovableActivityBarItem/IsMovableActivityBarItem.ts'

export const handleDragStart = (state: ActivityBarState, id: string): ActivityBarState => {
  if (!state.dragAndDropEnabled || !isMovableActivityBarItem(state.filteredItems.find((item) => item.id === id))) {
    return state
  }
  const { dropIndicator: _dropIndicator, ...rest } = state
  return { ...rest, draggedItemId: id }
}
