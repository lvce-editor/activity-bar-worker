import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'

const getNewItems = (items: readonly ActivityBarItem[], selectedIndex: number): readonly ActivityBarItem[] => {
  return items.map((item, index) => {
    const isSelected = index === selectedIndex
    return setFlag(item, ActivityBarItemFlags.Selected, isSelected)
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
