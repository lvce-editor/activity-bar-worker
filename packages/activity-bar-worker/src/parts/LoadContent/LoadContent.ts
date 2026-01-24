import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActiveView } from '../GetActiveView/GetActiveView.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import * as SideBarLocationType from '../SideBarLocationType/SideBarLocationType.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const loadContent = async (state: ActivityBarState, savedState: any): Promise<ActivityBarState> => {
  const { height, itemHeight } = state
  const items = getActivityBarItems(state)
  const activeView = await getActiveView()
  const index = items.findIndex((item) => item.id === activeView)
  const itemsWithSelected = markSelected(items, index)
  const filteredItems = getFilteredActivityBarItems(itemsWithSelected, height, itemHeight)
  const newItems = await updateItemsWithBadgeCount(filteredItems)
  return {
    ...state,
    activityBarItems: itemsWithSelected,
    currentViewletId: ViewletModuleId.Explorer,
    filteredItems: newItems,
    selectedIndex: index,
    sideBarLocation: SideBarLocationType.Left,
    sideBarVisible: true,
  }
}
