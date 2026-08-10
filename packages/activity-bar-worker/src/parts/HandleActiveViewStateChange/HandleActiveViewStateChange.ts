import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markActiveViews } from '../MarkActiveViews/MarkActiveViews.ts'

export const handleActiveViewStateChange = (state: ActivityBarState, id: string, visible: boolean): ActivityBarState => {
  const { activeViewIds, activityBarItems, height, itemHeight } = state
  const withoutView = activeViewIds.filter((activeViewId) => activeViewId !== id)
  const newActiveViewIds = visible ? [...withoutView, id] : withoutView
  const newActivityBarItems = markActiveViews(activityBarItems, newActiveViewIds)
  const filteredItems = getFilteredActivityBarItems(newActivityBarItems, height, itemHeight)
  return {
    ...state,
    activeViewIds: newActiveViewIds,
    activityBarItems: newActivityBarItems,
    filteredItems,
  }
}
