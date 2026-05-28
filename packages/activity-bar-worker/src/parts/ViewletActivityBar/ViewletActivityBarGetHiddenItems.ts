import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

export const getNumberOfVisibleItems = (state: { height: number; itemHeight: number }): number => {
  const { height, itemHeight } = state
  const numberOfVisibleItemsTop = Math.floor(height / itemHeight)
  return numberOfVisibleItemsTop
}

export const getHiddenItems = (state: ActivityBarState): readonly ActivityBarItem[] => {
  const numberOfVisibleItems = getNumberOfVisibleItems(state)
  const items = state.activityBarItems.filter((item) => item.flags & ActivityBarItemFlags.Enabled)
  if (numberOfVisibleItems >= items.length) {
    return []
  }
  return items.slice(numberOfVisibleItems - 2, -1)
}
