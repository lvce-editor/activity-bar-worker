import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleClickSettings = async (state: ActivityBarState, x: number, y: number, viewletId: string): Promise<ActivityBarState> => {
  await ContextMenu.show(x, y, MenuEntryId.Settings)
  return state
}
