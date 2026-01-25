import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarVirtualDom } from '../GetActivityBarVirtualDom/GetActivityBarVirtualDom.ts'

export const renderItems = (oldState: ActivityBarState, newState: ActivityBarState): any => {
  const { filteredItems, initial, uid } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, uid, []]
  }
  const dom = getActivityBarVirtualDom(filteredItems)
  return [ViewletCommand.SetDom2, uid, dom]
}
