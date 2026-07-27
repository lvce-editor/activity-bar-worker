import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'

export const handleContextMenu = async (
  context: AsyncCommandContext<ActivityBarState>,
  button: number,
  eventX: number,
  eventY: number,
): Promise<void> => {
  const sideBarLocation = await getSideBarPosition()
  const state = await context.updateState((state) => {
    return {
      ...state,
      sideBarLocation,
    }
  })
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.ActivityBar, eventX, eventY, {
    menuId: MenuEntryId.ActivityBar,
  })
}
