import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getAccountEnabled } from '../GetAccountEnabled/GetAccountEnabled.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

export const handleSettingsChanged = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { height, itemHeight, selectedIndex } = state
  const [accountEnabled, sidebarLocation] = await Promise.all([getAccountEnabled(state.accountEnabled), getSideBarPosition()])
  const newState = {
    ...state,
    accountEnabled,
  }
  const items = getActivityBarItems(newState)
  const itemsWithSelected = markSelected(items, selectedIndex)
  const filteredItems = getFilteredActivityBarItems(itemsWithSelected, height, itemHeight)
  const newItems = await updateItemsWithBadgeCount(filteredItems)
  return {
    ...newState,
    activityBarItems: itemsWithSelected,
    filteredItems: newItems,
    sideBarLocation: sidebarLocation,
  }
}
