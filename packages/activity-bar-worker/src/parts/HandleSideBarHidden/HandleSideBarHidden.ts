import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'

const clearItem = (item: ActivityBarItem): ActivityBarItem => {
  const withoutSelected = setFlag(item, ActivityBarItemFlags.Selected, false)
  return setFlag(withoutSelected, ActivityBarItemFlags.Focused, false)
}

export const handleSideBarHidden = (state: ActivityBarState): ActivityBarState => {
  const { activityBarItems, height, itemHeight } = state
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
