import { MouseEventType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as HandleClickAdditionalViews from '../HandleClickAdditionalViews/HandleClickAdditionalViews.ts'
import * as HandleClickOther from '../HandleClickOther/HandleClickOther.ts'
import * as HandleClickSettings from '../HandleClickSettings/HandleClickSettings.ts'

export const handleClickIndex = async (state: ActivityBarState, button: number, index: number, x: number, y: number): Promise<ActivityBarState> => {
  if (button !== MouseEventType.LeftClick) {
    return state
  }
  if (index === -1) {
    return state
  }
  const { activityBarItems } = state
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
