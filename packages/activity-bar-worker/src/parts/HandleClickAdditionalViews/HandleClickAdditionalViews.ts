import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleClickAdditionalViews = async (
  state: ActivityBarState,
  eventX: number,
  eventY: number,
  viewletId: string,
): Promise<ActivityBarState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.ActivityBarAdditionalViews, eventX, eventY, {
    menuId: MenuEntryId.ActivityBarAdditionalViews,
  })
  return state
}
