import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import * as SideBar from '../SideBar/SideBar.ts'

interface SideBarChangeResult {
  readonly type: 'show' | 'hide' | 'switch'
  readonly viewletId: string
}

const getSideBarChange = (sideBarVisible: boolean, currentViewletId: string, viewletId: string): SideBarChangeResult => {
  if (sideBarVisible) {
    if (currentViewletId === viewletId) {
      return {
        type: 'hide',
        viewletId,
      }
    }
    return {
      type: 'switch',
      viewletId,
    }
  }
  return {
    type: 'show',
    viewletId,
  }
}

export const handleClickOther = async (state: ActivityBarState, viewletId: string): Promise<ActivityBarState> => {
  const { activityBarItems, currentViewletId, height, itemHeight, sideBarVisible } = state
  const sideBarChange = getSideBarChange(sideBarVisible, currentViewletId, viewletId)
  await SideBar.toggle(viewletId)
  if (sideBarChange.type === 'hide') {
    const newActivityBarItems = markSelected(activityBarItems, -1)
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
