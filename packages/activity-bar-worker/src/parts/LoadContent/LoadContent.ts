import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActiveView } from '../GetActiveView/GetActiveView.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const loadContent = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { height, itemHeight } = state
  const items = getActivityBarItems(state)
  // TODO parallelize async calls
  // or add one function that returns all needed data
  const activeView = await getActiveView()
  const sideBarVisible = await getSideBarVisible()
  const index = items.findIndex((item) => item.id === activeView)
  const itemsWithSelected = markSelected(items, index)
  const filteredItems = getFilteredActivityBarItems(itemsWithSelected, height, itemHeight)
  const newItems = await updateItemsWithBadgeCount(filteredItems)
  const sidebarLocation = await getSideBarPosition()
  return {
    ...state,
    activityBarItems: itemsWithSelected,
    currentViewletId: ViewletModuleId.Explorer,
    filteredItems: newItems,
    initial: false,
    selectedIndex: index,
    sideBarLocation: sidebarLocation,
    sideBarVisible,
  }
}
