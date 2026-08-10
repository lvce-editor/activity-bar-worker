import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const resolveActiveViewIds = (state: ActivityBarState, newItems: readonly ActivityBarItem[]): readonly string[] => {
  const { activeViewIds, activityBarItems, selectedIndex } = state
  if (activeViewIds.length > 0 || selectedIndex === -1) {
    return activeViewIds
  }
  const selectedItem = activityBarItems[selectedIndex] || newItems[selectedIndex]
  return selectedItem ? [selectedItem.id] : []
}
