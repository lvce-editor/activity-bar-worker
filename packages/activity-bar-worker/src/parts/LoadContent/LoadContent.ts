import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const loadContent = async (state: ActivityBarState, savedState: any): Promise<ActivityBarState> => {
  return {
    ...state,
  }
}
