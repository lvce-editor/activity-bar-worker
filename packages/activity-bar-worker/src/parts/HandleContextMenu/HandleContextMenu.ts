import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenu = async (state: ActivityBarState, button: number, x: number, y: number): Promise<ActivityBarState> => {
  await ContextMenu.show(x, y, MenuEntryId.ActivityBar)
  return state
}
