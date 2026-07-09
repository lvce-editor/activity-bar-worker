import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

export const handleBadgeCountChange = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { activityBarItems, filteredItems } = state
  const newActivityBarItems = await updateItemsWithBadgeCount(activityBarItems)
  if (newActivityBarItems === activityBarItems) {
    return state
  }
  const itemById = new Map(newActivityBarItems.map((item) => [item.id, item]))
  const newFilteredItems = filteredItems.map((item) => itemById.get(item.id) || item)
  return {
    ...state,
    activityBarItems: newActivityBarItems,
    filteredItems: newFilteredItems,
  }
}
