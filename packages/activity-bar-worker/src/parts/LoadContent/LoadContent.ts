import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getUserState } from '../GetUserState/GetUserState.ts'
import { loadPreferences } from '../LoadPreferences/LoadPreferences.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { toUserLoginState } from '../ToUserLoginState/ToUserLoginState.ts'
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
    userInfo,
  } = await loadPreferences(accountEnabled, platform)
  const newState = {
    ...state,
    accountEnabled: accountEnabledNew,
    userLoginState: toUserLoginState(getUserState(userInfo)),
  }
  const items = getActivityBarItems(newState, contributedViews)
  const index = items.findIndex((item) => item.id === activeView)
  const selectedIndex = sideBarVisible ? index : -1
  const itemsWithSelected = markSelected(items, selectedIndex)
  const filteredItems = getFilteredActivityBarItems(itemsWithSelected, height, itemHeight)
  const newItems = await updateItemsWithBadgeCount(filteredItems)
  return {
    ...newState,
    activityBarItems: itemsWithSelected,
    currentViewletId: ViewletModuleId.Explorer,
    filteredItems: newItems,
    initial: false,
    selectedIndex,
    sideBarLocation: sidebarLocation,
    sideBarVisible,
  }
}
