import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const handleFocus = (state: ActivityBarState): ActivityBarState => {
  return {
    ...state,
    focused: true,
  }
}
