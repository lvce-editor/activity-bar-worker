import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getCustomIconSignature } from '../GetCustomIconSignature/GetCustomIconSignature.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'

export const toggleActivityBarItem = async (state: ActivityBarState, itemId: string): Promise<ActivityBarState> => {
  const { activityBarItems, aiNativeLayout, height, itemHeight } = state
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
  const accountEnabled = updatedItems.some((item) => item.id === 'Account' && item.flags & ActivityBarItemFlags.Enabled)
  const itemsWithUpdatedSettingsMargin = updatedItems.map((item) => {
    if (item.id !== 'Settings') {
      return item
    }
    return {
      ...item,
      flags: accountEnabled ? item.flags & ~ActivityBarItemFlags.MarginTop : item.flags | ActivityBarItemFlags.MarginTop,
    }
  })
  const filteredItems = getFilteredActivityBarItems(itemsWithUpdatedSettingsMargin, height, itemHeight, aiNativeLayout)
  return {
    ...state,
    activityBarItems: itemsWithUpdatedSettingsMargin,
    filteredItems,
    iconSignature: getCustomIconSignature(filteredItems),
  }
}
