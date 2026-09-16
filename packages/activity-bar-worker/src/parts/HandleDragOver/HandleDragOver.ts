import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { isMovableActivityBarItem } from '../IsMovableActivityBarItem/IsMovableActivityBarItem.ts'

const isBottomItem = (item: ActivityBarItem): boolean => item.id === 'Account' || item.id === 'Settings'

const getDropIndicator = (state: ActivityBarState, clientY: number): ActivityBarState['dropIndicator'] => {
  const { draggedItemId, filteredItems, itemHeight, y } = state
  if (!draggedItemId || !isMovableActivityBarItem(filteredItems.find((item) => item.id === draggedItemId))) {
    return undefined
  }
  const topItems = filteredItems.filter((item) => !isBottomItem(item))
  for (let index = 0; index < topItems.length; index++) {
    const item = topItems[index]
    const itemY = y + index * itemHeight
    if (clientY < itemY || clientY >= itemY + itemHeight) {
      continue
    }
    if (!isMovableActivityBarItem(item)) {
      return undefined
    }
    if (item.id === draggedItemId) {
      return undefined
    }
    const position = clientY < itemY + itemHeight / 2 ? 'before' : 'after'
    const sourceIndex = topItems.findIndex((candidate) => candidate.id === draggedItemId)
    if ((position === 'before' && sourceIndex === index - 1) || (position === 'after' && sourceIndex === index + 1)) {
      return undefined
    }
    return { id: item.id, position }
  }
  return undefined
}

export const handleDragOver = (state: ActivityBarState, clientY: number): ActivityBarState => {
  const dropIndicator = getDropIndicator(state, clientY)
  const { dropIndicator: oldIndicator } = state
  if (oldIndicator?.id === dropIndicator?.id && oldIndicator?.position === dropIndicator?.position) {
    return state
  }
  return {
    ...state,
    dropIndicator,
  }
}
