import { SideBarLocationType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const ACCOUNT_MENU_ID = 32_122

export const handleClickAccount = async (state: ActivityBarState, eventX: number, eventY: number, viewletId: string): Promise<ActivityBarState> => {
  const { sideBarLocation, uid } = state
  await RendererWorker.invoke('Layout.refreshAuthState')
  await ContextMenu.show2(uid, ACCOUNT_MENU_ID, eventX, eventY, {
    menuId: ACCOUNT_MENU_ID,
    openSubMenuToLeft: sideBarLocation === SideBarLocationType.Right,
  })
  return state
}
