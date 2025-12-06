import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

const toVisibleItems = (items: readonly ActivityBarItem[], selectedIndex: number, focusedIndex: number): readonly ActivityBarItem[] => {
  const visibleItems = []
  for (let i = 0; i < items.length; i++) {
    const isSelected = i === selectedIndex
    const isFocused = i === focusedIndex
    const item = items[i]
    let flags = item.flags
    if (isSelected) {
      flags |= ActivityBarItemFlags.Selected
    }
    if (isFocused) {
      flags |= ActivityBarItemFlags.Focused
    }
    visibleItems.push({
      ...item,
      flags,
    })
  }
  return visibleItems
}

export const getVisibleActivityBarItems = (state: ActivityBarState): readonly ActivityBarItem[] => {
  // @ts-ignore
  const { filteredItems, focusedIndex, selectedIndex } = state
  return toVisibleItems(filteredItems, selectedIndex, focusedIndex)
}
