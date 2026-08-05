import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as DomId from '../DomId/DomId.ts'
import * as FocusId from '../FocusId/FocusId.ts'

export const renderFocus = (oldState: ActivityBarState, newState: ActivityBarState): readonly any[] => {
  if (newState.focus === FocusId.List) {
    return [ViewletCommand.FocusSelector, newState.uid, `#${DomId.ActivityBar}`]
  }
  return []
}
