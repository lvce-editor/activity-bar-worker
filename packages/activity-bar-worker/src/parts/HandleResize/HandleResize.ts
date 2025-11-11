import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { Dimensions } from '../Dimensions/Dimensions.ts'
import * as GetFilteredActivityBarItems from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'

export const handleResize = (state: ActivityBarState, dimensions: Dimensions): ActivityBarState => {
  const { activityBarItems, itemHeight } = state
  const { x, y, width, height } = dimensions
  const filteredItems = GetFilteredActivityBarItems.getFilteredActivityBarItems(activityBarItems, height, itemHeight)
  return {
    ...state,
    x,
    y,
    width,
    height,
    filteredItems,
  }
}
