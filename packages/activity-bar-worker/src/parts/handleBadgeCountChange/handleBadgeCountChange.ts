import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

export const handleBadgeCountChange = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { filteredItems } = state
  const newItems = await updateItemsWithBadgeCount(filteredItems)
  return {
    ...state,
    filteredItems: newItems,
  }
}
