import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

const isEnabled = (activityBarItem: any): boolean => {
  return activityBarItem.enabled
}

export const toggleActivityBarItem = async (state: ActivityBarState, item: any): Promise<ActivityBarState> => {
  const { activityBarItems } = state
  const activityBarItem = activityBarItems.find((activityBarItem) => activityBarItem.id === item.label)
  // @ts-ignore
  activityBarItem.enabled = !activityBarItem.enabled
  return {
    ...state,
    activityBarItems: activityBarItems.filter(isEnabled),
  }
}
