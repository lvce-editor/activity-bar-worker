import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { UpdateConfig } from '../UpdateConfig/UpdateConfig.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as UpdateState from '../UpdateState/UpdateState.ts'

const getNewItems = (items: readonly ActivityBarItem[], state: number): readonly ActivityBarItem[] => {
  return items.map((item) => {
    if (item.id === 'Settings') {
      if (state === UpdateState.CheckingForUpdate) {
        return {
          ...item,
          badgeIcon: 'clock',
          flags: item.flags | ActivityBarItemFlags.Progress,
        }
      }
      if (state === UpdateState.WaitingForRestart) {
        return {
          ...item,
          badgeIcon: '',
          badgeText: '1',
        }
      }
      return item
    }
    return item
  })
}

export const handleUpdateStateChange = async (state: ActivityBarState, config: UpdateConfig): Promise<ActivityBarState> => {
  const { filteredItems } = state
  const newItems = getNewItems(filteredItems, config.state)
  return {
    ...state,
    filteredItems: newItems,
    updateProgress: config.progress,
    updateState: config.state,
  }
}
