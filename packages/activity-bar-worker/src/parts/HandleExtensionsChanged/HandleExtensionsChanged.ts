import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getContributedViews } from '../GetContributedViews/GetContributedViews.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

export const handleExtensionsChanged = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { height, itemHeight, platform, selectedIndex } = state
  const contributedViews = await getContributedViews(platform)

  const items = getActivityBarItems(state, contributedViews)
  const itemsWithSelected = markSelected(items, selectedIndex)
  const activityBarItems = await updateItemsWithBadgeCount(itemsWithSelected)
  const filteredItems = getFilteredActivityBarItems(activityBarItems, height, itemHeight)
  return {
    ...state,
    activityBarItems,
    filteredItems,
  }
}
