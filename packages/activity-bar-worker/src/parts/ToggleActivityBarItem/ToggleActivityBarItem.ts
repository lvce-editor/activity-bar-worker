import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

export const toggleActivityBarItem = async (state: ActivityBarState, itemId: string): Promise<ActivityBarState> => {
  const { activityBarItems } = state
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
  return {
    ...state,
    activityBarItems: updatedItems,
  }
}
