import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'

const clearItem = (item: ActivityBarItem): ActivityBarItem => {
  const withoutSelected = setFlag(item, ActivityBarItemFlags.Selected, false)
  return setFlag(withoutSelected, ActivityBarItemFlags.Focused, false)
}

export const handleSideBarStateChange = async (
  state: ActivityBarState,
  id = state.currentViewletId,
  sideBarVisibleOverride?: boolean,
): Promise<ActivityBarState> => {
  const { activityBarItems, height, itemHeight } = state
  const sideBarVisible = typeof sideBarVisibleOverride === 'boolean' ? sideBarVisibleOverride : await getSideBarVisible()
  if (!sideBarVisible) {
    const itemsCleared = activityBarItems.map(clearItem)
    const filteredItems = getFilteredActivityBarItems(itemsCleared, height, itemHeight)
    return {
      ...state,
      activityBarItems: itemsCleared,
      filteredItems,
      focusedIndex: -1,
      selectedIndex: -1,
      sideBarVisible: false,
    }
  }
  const selectedIndex = findIndex(activityBarItems, id)
  const newActivityBarItems = markSelected(activityBarItems, selectedIndex)
  const filteredItems = getFilteredActivityBarItems(newActivityBarItems, height, itemHeight)
  return {
    ...state,
    activityBarItems: newActivityBarItems,
    currentViewletId: id,
    filteredItems,
    selectedIndex,
    sideBarVisible,
  }
}
