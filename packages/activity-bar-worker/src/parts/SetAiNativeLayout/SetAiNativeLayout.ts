import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'

export const setAiNativeLayout = (state: ActivityBarState, aiNativeLayout: boolean): ActivityBarState => {
  const { activityBarItems, height, itemHeight } = state
  const filteredItems = getFilteredActivityBarItems(activityBarItems, height, itemHeight, aiNativeLayout)
  return {
    ...state,
    aiNativeLayout,
    filteredItems,
  }
}
