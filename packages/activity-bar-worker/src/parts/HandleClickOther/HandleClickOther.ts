import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'
import { getActiveViewIds } from '../GetActiveViewIds/GetActiveViewIds.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarChange } from '../GetSideBarChange/GetSideBarChange.ts'
import { markActiveViews } from '../MarkActiveViews/MarkActiveViews.ts'
import * as SideBar from '../SideBar/SideBar.ts'

export const handleClickOther = async (state: ActivityBarState, viewletId: string): Promise<ActivityBarState> => {
  const { activityBarItems, currentViewletId, height, itemHeight, sideBarVisible } = state
  const activeViewIds = getActiveViewIds(activityBarItems)
  const selectedItem = activityBarItems.find((item) => item.id === viewletId)
  const sideBarChange = getSideBarChange(sideBarVisible, currentViewletId, viewletId)
  await SideBar.toggle(viewletId)
  if (selectedItem?.preferredLocation === 'preview') {
    const isActive = activeViewIds.includes(viewletId)
    const newActiveViewIds = isActive ? activeViewIds.filter((id) => id !== viewletId) : [...activeViewIds, viewletId]
    const newActivityBarItems = markActiveViews(activityBarItems, newActiveViewIds)
    const filteredItems = getFilteredActivityBarItems(newActivityBarItems, height, itemHeight)
    return {
      ...state,
      activityBarItems: newActivityBarItems,
      filteredItems,
    }
  }
  const withoutCurrentSideBarView = activeViewIds.filter((id) => id !== currentViewletId)
  if (sideBarChange.type === 'hide') {
    const newActivityBarItems = markActiveViews(activityBarItems, withoutCurrentSideBarView)
    const filteredItems = getFilteredActivityBarItems(newActivityBarItems, height, itemHeight)
    return {
      ...state,
      activityBarItems: newActivityBarItems,
      filteredItems,
      selectedIndex: -1,
      sideBarVisible: false,
    }
  }
  const selectedIndex = findIndex(activityBarItems, viewletId)
  const newActiveViewIds = [...withoutCurrentSideBarView, viewletId]
  const newActivityBarItems = markActiveViews(activityBarItems, newActiveViewIds)
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
