import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'

const getNewItems = (items: readonly ActivityBarItem[], selectedIndex: number): readonly ActivityBarItem[] => {
  return items.map((item) => {
    return {
      ...item,
      // TODO set selected property if it matches the selected index
    }
  })
}

export const handleSideBarViewletChange = (state: ActivityBarState, id: string, ...args: readonly any[]): ActivityBarState => {
  const { activityBarItems } = state
  const index = findIndex(activityBarItems, id)
  const newActivityBarItems = getNewItems(activityBarItems, index)
  return {
    ...state,
    selectedIndex: index,
    currentViewletId: id,
    activityBarItems: newActivityBarItems,
  }
}
