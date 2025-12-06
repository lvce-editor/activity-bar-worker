import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getCss } from '../GetCss/GetCss.ts'

export const renderCss = (oldState: ActivityBarState, newState: ActivityBarState): readonly any[] => {
  const { itemHeight, uid } = newState
  const css = getCss(itemHeight)
  return [ViewletCommand.SetCss, uid, css]
}
