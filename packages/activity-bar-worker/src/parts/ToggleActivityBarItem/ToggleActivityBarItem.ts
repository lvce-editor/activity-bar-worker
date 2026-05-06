import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'

export const toggleActivityBarItem = async (state: ActivityBarState, itemId: string): Promise<ActivityBarState> => {
  const { activityBarItems, height, itemHeight } = state
  const updatedItems = activityBarItems.map((item) => {
    if (item.id === itemId) {
      const isCurrentlyEnabled = item.flags & ActivityBarItemFlags.Enabled
      return {
        ...item,
        flags: isCurrentlyEnabled ? item.flags & ~ActivityBarItemFlags.Enabled : item.flags | ActivityBarItemFlags.Enabled,
      }
    }
    return item
  })
  const filteredItems = getFilteredActivityBarItems(updatedItems, height, itemHeight)
  return {
    ...state,
    activityBarItems: updatedItems,
    filteredItems,
  }
}
