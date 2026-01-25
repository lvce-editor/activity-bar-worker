import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const setAccountEnabled = (state: ActivityBarState, enabled: boolean): ActivityBarState => {
  return {
    ...state,
    accountEnabled: enabled,
  }
}
