import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarVirtualDom } from '../GetActivityBarVirtualDom/GetActivityBarVirtualDom.ts'

export const renderItems = (oldState: ActivityBarState, newState: ActivityBarState): any => {
  const { uid, activityBarItems } = newState
  const dom = getActivityBarVirtualDom(activityBarItems)
  return [ViewletCommand.SetDom2, uid, dom]
}
