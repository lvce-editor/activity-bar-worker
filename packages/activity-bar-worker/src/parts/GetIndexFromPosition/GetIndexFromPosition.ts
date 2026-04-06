import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

const isBottomItem = (item: ActivityBarItem): boolean => {
  return item.id === 'Account' || item.id === 'Settings'
}

const getBottomItemCount = (items: readonly ActivityBarItem[] | number): number => {
  if (typeof items === 'number') {
    return items > 1 ? 1 : 0
  }
  return items.filter(isBottomItem).length
}

const getItemCount = (items: readonly ActivityBarItem[] | number): number => {
  if (typeof items === 'number') {
    return items
  }
  return items.length
}

export const getIndexFromPosition = (
  y: number,
  eventX: number,
  eventY: number,
  itemHeight: number,
  items: readonly ActivityBarItem[] | number,
  height: number,
): number => {
  void eventX
  const itemCount = getItemCount(items)
  if (itemCount === 0) {
    return -1
  }
  // If there's only one item, treat it as a top item (not Settings at bottom)
  if (itemCount === 1) {
    const relativeY = eventY - y
    const index = Math.floor(relativeY / itemHeight)
    if (index < 0 || index >= itemCount) {
      return -1
    }
    return index
  }
  const bottomItemCount = getBottomItemCount(items)
  const bottomItemsHeight = bottomItemCount * itemHeight
  const bottomItemsTopY = y + height - bottomItemsHeight

  if (bottomItemCount > 0 && eventY >= bottomItemsTopY && eventY < y + height) {
    const relativeBottomY = eventY - bottomItemsTopY
    return itemCount - bottomItemCount + Math.floor(relativeBottomY / itemHeight)
  }

  const topItemCount = itemCount - bottomItemCount
  const relativeY = eventY - y
  const index = Math.floor(relativeY / itemHeight)
  if (index < 0 || index >= topItemCount) {
    return -1
  }
  return index
}
