import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markActiveViews } from '../MarkActiveViews/MarkActiveViews.ts'
import { resolveActiveViewIds } from '../ResolveActiveViewIds/ResolveActiveViewIds.ts'

export const setAccountEnabled = (state: ActivityBarState, enabled: boolean): ActivityBarState => {
  const { height, itemHeight } = state
  const newState = {
    ...state,
    accountEnabled: enabled,
  }

  const newActivityBarItems = getActivityBarItems(newState)
  const activeViewIds = resolveActiveViewIds(state, newActivityBarItems)
  const markedItems = markActiveViews(newActivityBarItems, activeViewIds)
  const filteredItems = getFilteredActivityBarItems(markedItems, height, itemHeight)

  return {
    ...newState,
    activeViewIds,
    activityBarItems: markedItems,
    filteredItems: filteredItems,
  }
}
