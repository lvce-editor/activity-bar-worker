import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getAccountEnabled } from '../GetAccountEnabled/GetAccountEnabled.ts'
import { getActiveView } from '../GetActiveView/GetActiveView.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getUserInfo } from '../GetUserInfo/GetUserInfo.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { toUserLoginState } from '../ToUserLoginState/ToUserLoginState.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

const getUserState = (userInfo: unknown): unknown => {
  if (!userInfo || typeof userInfo !== 'object') {
    return undefined
  }
  if (!('userState' in userInfo)) {
    return undefined
  }
  return userInfo.userState
}

export const loadContent = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { accountEnabled, height, itemHeight } = state
  const [accountEnabledNew, activeView, sideBarVisible, sidebarLocation, userInfo] = await Promise.all([
    getAccountEnabled(accountEnabled),
    getActiveView(),
    getSideBarVisible(),
    getSideBarPosition(),
    getUserInfo(),
  ])
  const newState = {
    ...state,
    accountEnabled: accountEnabledNew,
    userLoginState: toUserLoginState(getUserState(userInfo)),
  }
  const items = getActivityBarItems(newState)
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
