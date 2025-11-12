import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenu = async (state: ActivityBarState, button: number, eventX: number, eventY: number): Promise<ActivityBarState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.ActivityBar, eventX, eventY, {
    menuId: MenuEntryId.ActivityBar,
  })
  return state
}
