import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarVirtualDom } from '../GetActivityBarVirtualDom/GetActivityBarVirtualDom.ts'
import { getVisibleActivityBarItems } from '../GetVisibleActivityBarItems/GetVisibleActivityBarItems.ts'

export const renderItems = (oldState: ActivityBarState, newState: ActivityBarState): any => {
  const { filteredItems, focused, focusedIndex, initial, uid } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, uid, []]
  }
  const visibleItems = getVisibleActivityBarItems(filteredItems, focused ? focusedIndex : -1)
  const dom = getActivityBarVirtualDom(visibleItems)
  return [ViewletCommand.SetDom2, uid, dom]
}
