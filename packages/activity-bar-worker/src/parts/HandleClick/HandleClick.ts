import { MouseEventType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getIndexFromPosition } from '../GetIndexFromPosition/GetIndexFromPosition.ts'
import * as HandleClickAdditionalViews from '../HandleClickAdditionalViews/HandleClickAdditionalViews.ts'
import * as HandleClickOther from '../HandleClickOther/HandleClickOther.ts'
import * as HandleClickSettings from '../HandleClickSettings/HandleClickSettings.ts'

export const handleClick = async (state: ActivityBarState, button: number, x: number, y: number): Promise<ActivityBarState> => {
  if (button !== MouseEventType.LeftClick) {
    return state
  }
  const { activityBarItems, itemHeight } = state
  const index = getIndexFromPosition(x, y, itemHeight, activityBarItems.length)
  if (index === -1) {
    return state
  }
  const item = activityBarItems[index]
  const viewletId = item.id
  switch (viewletId) {
    case 'Settings':
      return HandleClickSettings.handleClickSettings(state, x, y, viewletId)
    case 'Additional Views':
      return HandleClickAdditionalViews.handleClickAdditionalViews(state, x, y, viewletId)
    default:
      return HandleClickOther.handleClickOther(state, x, y, viewletId)
  }
}
