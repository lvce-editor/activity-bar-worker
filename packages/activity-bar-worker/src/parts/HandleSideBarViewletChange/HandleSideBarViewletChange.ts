import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'

export const handleSideBarViewletChange = (state: ActivityBarState, id: string, ...args: readonly any[]): ActivityBarState => {
  const index = findIndex(state.activityBarItems, id)
  return {
    ...state,
    selectedIndex: index,
  }
}
