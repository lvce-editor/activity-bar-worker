import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { UpdateConfig } from '../UpdateConfig/UpdateConfig.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

const getNewItems = (items: readonly ActivityBarItem[], state: number): readonly ActivityBarItem[] => {
  return items.map((item) => {
    if (item.id === 'Settings' && state === 1) {
      return {
        ...item,
        badgeIcon: 'clock',
        flags: item.flags | ActivityBarItemFlags.Progress,
      }
    }
    return item
  })
}

export const handleUpdateStateChange = async (state: ActivityBarState, config: UpdateConfig): Promise<ActivityBarState> => {
  const { activityBarItems } = state
  const newItems = getNewItems(activityBarItems, config.state)
  return {
    ...state,
    updateState: config.state,
    updateProgress: config.progress,
    activityBarItems: newItems,
  }
}
