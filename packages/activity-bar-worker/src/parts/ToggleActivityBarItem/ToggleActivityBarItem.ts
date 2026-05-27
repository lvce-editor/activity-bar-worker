import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import * as SideBar from '../SideBar/SideBar.ts'

export const toggleActivityBarItem = async (state: ActivityBarState, itemId: string): Promise<ActivityBarState> => {
  const { activityBarItems, currentViewletId, height, itemHeight, sideBarVisible } = state
  const hidesActiveView = sideBarVisible && currentViewletId === itemId
  const updatedItems = activityBarItems.map((item) => {
    if (item.id === itemId) {
      const isCurrentlyEnabled = item.flags & ActivityBarItemFlags.Enabled
      return {
        ...item,
        flags: isCurrentlyEnabled ? item.flags & ~ActivityBarItemFlags.Enabled : item.flags | ActivityBarItemFlags.Enabled,
      }
    }
    return item
  })
  if (hidesActiveView) {
    await SideBar.hide()
  }
  const activityBarItemsWithSelection = hidesActiveView ? markSelected(updatedItems, -1) : updatedItems
  const filteredItems = getFilteredActivityBarItems(activityBarItemsWithSelection, height, itemHeight)
  return {
    ...state,
    activityBarItems: activityBarItemsWithSelection,
    filteredItems,
    selectedIndex: hidesActiveView ? -1 : state.selectedIndex,
    sideBarVisible: hidesActiveView ? false : sideBarVisible,
  }
}
