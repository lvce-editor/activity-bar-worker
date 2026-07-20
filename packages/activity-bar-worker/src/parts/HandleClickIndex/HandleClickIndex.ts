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
  const { filteredItems, focused } = state
  const clickState = focused
    ? {
        ...state,
        focused: false,
      }
    : state
  const item = filteredItems[index]
  const viewletId = item.id
  switch (viewletId) {
    case 'Account':
      return HandleClickAccount.handleClickAccount(clickState, x, y, viewletId)
    case 'Additional Views':
      return HandleClickAdditionalViews.handleClickAdditionalViews(clickState, x, y, viewletId)
    case 'Settings':
      return HandleClickSettings.handleClickSettings(clickState, x, y, viewletId)
    default:
      return HandleClickOther.handleClickOther(clickState, viewletId)
  }
}
