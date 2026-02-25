import { MouseEventType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as HandleClickAccount from '../HandleClickAccount/HandleClickAccount.ts'
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
  const { filteredItems } = state
  const item = filteredItems[index]
  const viewletId = item.id
  switch (viewletId) {
    case 'Account':
      return HandleClickAccount.handleClickAccount(state, x, y, viewletId)
    case 'Additional Views':
      return HandleClickAdditionalViews.handleClickAdditionalViews(state, x, y, viewletId)
    case 'Settings':
      return HandleClickSettings.handleClickSettings(state, x, y, viewletId)
    default:
      return HandleClickOther.handleClickOther(state, viewletId)
  }
}
