import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { isMovableActivityBarItem } from '../IsMovableActivityBarItem/IsMovableActivityBarItem.ts'

export const handleDragStart = (state: ActivityBarState, id: string): ActivityBarState => {
  const { dragAndDropEnabled, filteredItems } = state
  if (!dragAndDropEnabled || !isMovableActivityBarItem(filteredItems.find((item) => item.id === id))) {
    return state
  }
  return {
    ...state,
    draggedItemId: id,
    dropIndicator: undefined,
  }
}
