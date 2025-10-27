import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'

export const handleSideBarViewletChange = (state: ActivityBarState, id: string, ...args: readonly any[]): ActivityBarState => {
  const { activityBarItems } = state
  const index = findIndex(activityBarItems, id)
  const newActivityBarItems = markSelected(activityBarItems, index)
  return {
    ...state,
    selectedIndex: index,
    currentViewletId: id,
    activityBarItems: newActivityBarItems,
    sideBarVisible: true,
  }
}
