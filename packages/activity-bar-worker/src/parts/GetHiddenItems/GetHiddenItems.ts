import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getNumberOfVisibleItems } from '../ViewletActivityBar/ViewletActivityBarGetHiddenItems.ts'

export const getHiddenItems = (state: ActivityBarState): readonly ActivityBarItem[] => {
  const { activityBarItems } = state
  const numberOfVisibleItems = getNumberOfVisibleItems(state)
  const items = activityBarItems
  if (numberOfVisibleItems >= items.length) {
    return []
  }
  return activityBarItems.slice(numberOfVisibleItems - 2, -1)
}
