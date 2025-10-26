import { ViewletCommand, WhenExpression } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as FocusId from '../FocusId/FocusId.ts'

export const renderFocusContext = (oldState: ActivityBarState, newState: ActivityBarState): readonly any[] => {
  if (newState.focus === FocusId.List) {
    return [ViewletCommand.SetFocusContext, newState.uid, WhenExpression.FocusExplorer]
  }
  return []
}
