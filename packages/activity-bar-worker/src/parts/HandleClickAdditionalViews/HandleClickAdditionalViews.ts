import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleClickAdditionalViews = async (state: ActivityBarState, x: number, y: number, viewletId: string): Promise<ActivityBarState> => {
  await ContextMenu.show(x, y, MenuEntryId.ActivityBarAdditionalViews)
  return state
}
