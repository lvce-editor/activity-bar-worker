import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'

export const handleSideBarViewletChange = async (state: ActivityBarState, id: string, ...args: readonly any[]): Promise<ActivityBarState> => {
  const { activityBarItems, height, itemHeight } = state
  const sideBarVisible = await getSideBarVisible()
  const index = findIndex(activityBarItems, id)
  const newActivityBarItems = markSelected(activityBarItems, index)
  const filteredItems = getFilteredActivityBarItems(newActivityBarItems, height, itemHeight)
  return {
    ...state,
    activityBarItems: newActivityBarItems,
    currentViewletId: id,
    filteredItems,
    selectedIndex: index,
    sideBarVisible,
  }
}
