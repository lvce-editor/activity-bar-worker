import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const handleBlur = (state: ActivityBarState): ActivityBarState => {
  return {
    ...state,
    focused: false,
  }
}
