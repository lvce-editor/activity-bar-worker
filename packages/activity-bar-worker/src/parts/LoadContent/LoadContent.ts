import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getAccountEnabled } from '../GetAccountEnabled/GetAccountEnabled.ts'
import { getActiveView } from '../GetActiveView/GetActiveView.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const loadContent = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { accountEnabled, height, itemHeight } = state
  const [accountEnabledNew, activeView, sideBarVisible, sidebarLocation] = await Promise.all([
    getAccountEnabled(accountEnabled),
    getActiveView(),
    getSideBarVisible(),
    getSideBarPosition(),
  ])
  const newState = {
    ...state,
    accountEnabled: accountEnabledNew,
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
