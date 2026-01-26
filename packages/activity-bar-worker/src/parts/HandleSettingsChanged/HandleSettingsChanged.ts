import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

export const handleSettingsChanged = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { height, itemHeight, selectedIndex } = state
  const items = getActivityBarItems(state)
  const itemsWithSelected = markSelected(items, selectedIndex)
  const filteredItems = getFilteredActivityBarItems(itemsWithSelected, height, itemHeight)
  const newItems = await updateItemsWithBadgeCount(filteredItems)
  const sidebarLocation = await getSideBarPosition()
  return {
    ...state,
    activityBarItems: itemsWithSelected,
    filteredItems: newItems,
    sideBarLocation: sidebarLocation,
  }
}
