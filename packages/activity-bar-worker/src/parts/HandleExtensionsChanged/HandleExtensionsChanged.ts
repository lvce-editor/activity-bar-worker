import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getContributedViews } from '../GetContributedViews/GetContributedViews.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markActiveViews } from '../MarkActiveViews/MarkActiveViews.ts'
import { resolveActiveViewIds } from '../ResolveActiveViewIds/ResolveActiveViewIds.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

export const handleExtensionsChanged = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { height, itemHeight, platform } = state
  const contributedViews = await getContributedViews(platform)

  const items = getActivityBarItems(state, contributedViews)
  const activeViewIds = resolveActiveViewIds(state, items)
  const itemsWithSelected = markActiveViews(items, activeViewIds)
  const activityBarItems = await updateItemsWithBadgeCount(itemsWithSelected)
  const filteredItems = getFilteredActivityBarItems(activityBarItems, height, itemHeight)
  return {
    ...state,
    activeViewIds,
    activityBarItems,
    filteredItems,
  }
}
