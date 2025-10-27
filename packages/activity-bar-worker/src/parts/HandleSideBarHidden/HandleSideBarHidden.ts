import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const handleSideBarHidden = (state: ActivityBarState): ActivityBarState => {
  return {
    ...state,
    focusedIndex: -1,
    selectedIndex: -1,
  }
}
