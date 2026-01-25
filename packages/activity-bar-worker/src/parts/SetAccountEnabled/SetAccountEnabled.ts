import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'

export const setAccountEnabled = (state: ActivityBarState, enabled: boolean): ActivityBarState => {
  const { height, itemHeight, selectedIndex } = state
  const newState = {
    ...state,
    accountEnabled: enabled,
  }

  const newActivityBarItems = getActivityBarItems(newState)
  const markedItems = markSelected(newActivityBarItems, selectedIndex)
  const filteredItems = getFilteredActivityBarItems(markedItems, height, itemHeight)

  return {
    ...newState,
    activityBarItems: markedItems,
    filteredItems: filteredItems,
  }
}
