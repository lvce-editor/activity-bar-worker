import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'

const clearItem = (item: ActivityBarItem): ActivityBarItem => {
  const withoutSelected = setFlag(item, ActivityBarItemFlags.Selected, false)
  return setFlag(withoutSelected, ActivityBarItemFlags.Focused, false)
}

export const handleSideBarHidden = (state: ActivityBarState): ActivityBarState => {
  const { activityBarItems } = state
  const itemsCleared = activityBarItems.map(clearItem)
  return {
    ...state,
    activityBarItems: itemsCleared,
    focusedIndex: -1,
    selectedIndex: -1,
    sideBarVisible: false,
  }
}
