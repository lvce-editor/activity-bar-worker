import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getAccountEnabled } from '../GetAccountEnabled/GetAccountEnabled.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getContributedViews } from '../GetContributedViews/GetContributedViews.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

export const handleSettingsChanged = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { accountEnabled: currentAccountEnabled, height, itemHeight, platform, selectedIndex } = state
  const [accountEnabled, contributedViews, sidebarLocation] = await Promise.all([
    getAccountEnabled(currentAccountEnabled),
    getContributedViews(platform),
    getSideBarPosition(),
  ])
  const newState = {
    ...state,
    accountEnabled,
  }
  const items = getActivityBarItems(newState, contributedViews)
  const itemsWithSelected = markSelected(items, selectedIndex)
  const activityBarItems = await updateItemsWithBadgeCount(itemsWithSelected)
  const filteredItems = getFilteredActivityBarItems(activityBarItems, height, itemHeight)
  return {
    ...newState,
    activityBarItems,
    filteredItems,
    sideBarLocation: sidebarLocation,
  }
}
