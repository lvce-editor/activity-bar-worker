import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import * as SideBar from '../SideBar/SideBar.ts'

export const handleClickOther = async (state: ActivityBarState, viewletId: string): Promise<ActivityBarState> => {
  const { activityBarItems, currentViewletId, height, itemHeight, sideBarVisible } = state
  if (sideBarVisible) {
    if (currentViewletId === viewletId) {
      await SideBar.hide()
      return state
    }
    await SideBar.show(sideBarVisible, viewletId)
    return state
  }
  await SideBar.show(sideBarVisible, viewletId)
  const selectedIndex = findIndex(activityBarItems, viewletId)
  const newActivityBarItems = markSelected(activityBarItems, selectedIndex)
  const filteredItems = getFilteredActivityBarItems(newActivityBarItems, height, itemHeight)
  return {
    ...state,
    activityBarItems: newActivityBarItems,
    currentViewletId: viewletId,
    filteredItems,
    selectedIndex,
    sideBarVisible: true,
  }
}
