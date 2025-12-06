import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const focusIndex = (state: ActivityBarState, index: number): ActivityBarState => {
  return {
    ...state,
    focused: true,
    focusedIndex: index,
  }
}
