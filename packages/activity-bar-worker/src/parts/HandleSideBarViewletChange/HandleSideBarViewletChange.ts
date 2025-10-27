import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'

export const handleSideBarViewletChange = (state: ActivityBarState, id: string, ...args: readonly any[]): ActivityBarState => {
  const { activityBarItems } = state
  const index = findIndex(activityBarItems, id)
  return {
    ...state,
    selectedIndex: index,
    currentViewletId: id,
  }
}
