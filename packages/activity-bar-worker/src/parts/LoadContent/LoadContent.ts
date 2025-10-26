import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'

export const loadContent = async (state: ActivityBarState, savedState: any): Promise<ActivityBarState> => {
  const items = getActivityBarItems()
  return {
    ...state,
    activityBarItems: items,
  }
}
