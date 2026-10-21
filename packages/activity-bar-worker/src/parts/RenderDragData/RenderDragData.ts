import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarDragData from '../ActivityBarDragData/ActivityBarDragData.ts'

export const renderDragData = (_oldState: ActivityBarState, newState: ActivityBarState): readonly any[] => {
  const { dragAndDropMimeType, draggedItemId, filteredItems, uid } = newState
  const item = filteredItems.find((candidate) => candidate.id === draggedItemId)
  if (!draggedItemId || !item) {
    return []
  }
  return [
    'Viewlet.setDragData',
    uid,
    {
      items: [{ data: ActivityBarDragData.getData(dragAndDropMimeType, draggedItemId), type: dragAndDropMimeType }],
      label: item.title,
    },
  ]
}
