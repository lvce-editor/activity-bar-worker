import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActiveViewIds } from '../GetActiveViewIds/GetActiveViewIds.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markActiveViews } from '../MarkActiveViews/MarkActiveViews.ts'

export const handleActiveViewStateChange = (state: ActivityBarState, id: string, visible: boolean): ActivityBarState => {
  const { activityBarItems, height, itemHeight } = state
  const activeViewIds = getActiveViewIds(activityBarItems)
  const withoutView = activeViewIds.filter((activeViewId) => activeViewId !== id)
  const newActiveViewIds = visible ? [...withoutView, id] : withoutView
  const newActivityBarItems = markActiveViews(activityBarItems, newActiveViewIds)
  const filteredItems = getFilteredActivityBarItems(newActivityBarItems, height, itemHeight)
  return {
    ...state,
    activityBarItems: newActivityBarItems,
    filteredItems,
  }
}
