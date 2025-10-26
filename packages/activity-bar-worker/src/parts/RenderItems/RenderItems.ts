import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const renderItems = (oldState: ActivityBarState, newState: ActivityBarState): any => {
  return [ViewletCommand.SetDom2, []]
}
