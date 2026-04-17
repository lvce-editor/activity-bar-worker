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

const applySideBarChange = async (change: SideBarChangeResult): Promise<void> => {
  switch (change.type) {
    case 'hide':
      await SideBar.hide()
      break
    case 'show':
      await SideBar.show(false, change.viewletId)
      break
    case 'switch':
      await SideBar.show(true, change.viewletId)
      break
  }
}

export const handleClickOther = async (state: ActivityBarState, viewletId: string): Promise<ActivityBarState> => {
  const { activityBarItems, currentViewletId, height, itemHeight, sideBarVisible } = state
  const sideBarChange = getSideBarChange(sideBarVisible, currentViewletId, viewletId)
  await applySideBarChange(sideBarChange)
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
