import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { loadPreferences } from '../LoadPreferences/LoadPreferences.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const loadContent = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { accountEnabled, height, itemHeight, platform } = state
  const {
    accountEnabled: accountEnabledNew,
    activeView,
    contributedViews,
    sidebarLocation,
    sideBarVisible,
  } = await loadPreferences(accountEnabled, platform)
  const newState = {
    ...state,
    accountEnabled: accountEnabledNew,
  }
  const items = getActivityBarItems(newState, contributedViews)
  const index = items.findIndex((item) => item.id === activeView)
  const selectedIndex = sideBarVisible ? index : -1
  const itemsWithSelected = markSelected(items, selectedIndex)
  const activityBarItems = await updateItemsWithBadgeCount(itemsWithSelected)
  const filteredItems = getFilteredActivityBarItems(activityBarItems, height, itemHeight)
  return {
    ...newState,
    activityBarItems,
    currentViewletId: ViewletModuleId.Explorer,
    filteredItems,
    initial: false,
    selectedIndex,
    sideBarLocation: sidebarLocation,
    sideBarVisible,
  }
}
