import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const focusIndex = (state: ActivityBarState, index: number): ActivityBarState => {
  return {
    ...state,
    focusedIndex: index,
    focused: true,
  }
}
