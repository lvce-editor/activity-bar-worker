import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import { isMovableActivityBarItem } from '../IsMovableActivityBarItem/IsMovableActivityBarItem.ts'

export const reorderActivityBarItems = (
  items: readonly ActivityBarItem[],
  draggedItemId: string,
  targetId: string,
  position: 'after' | 'before',
): readonly ActivityBarItem[] => {
  const sourceIndex = items.findIndex((item) => item.id === draggedItemId)
  const targetIndex = items.findIndex((item) => item.id === targetId)
  if (
    sourceIndex === -1 ||
    targetIndex === -1 ||
    sourceIndex === targetIndex ||
    !isMovableActivityBarItem(items[sourceIndex]) ||
    !isMovableActivityBarItem(items[targetIndex])
  ) {
    return items
  }
  const result = [...items]
  const [source] = result.splice(sourceIndex, 1)
  const newTargetIndex = result.findIndex((item) => item.id === targetId)
  const insertionIndex = newTargetIndex + (position === 'after' ? 1 : 0)
  result.splice(insertionIndex, 0, source)
  return result
}
