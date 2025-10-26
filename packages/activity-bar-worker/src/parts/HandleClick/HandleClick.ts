import { MenuEntryId, MouseEventType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const handleClickSettings = async (state: ActivityBarState, x: number, y: number, viewletId: string): Promise<ActivityBarState> => {
  await ContextMenu.show(x, y, MenuEntryId.Settings)
  return state
}

const handleClickAdditionalViews = async (state: ActivityBarState, x: number, y: number, viewletId: string): Promise<ActivityBarState> => {
  await ContextMenu.show(x, y, MenuEntryId.ActivityBarAdditionalViews)
  return state
}

const handleClickOther = async (state: ActivityBarState, x: number, y: number, viewletId: string): Promise<ActivityBarState> => {
  // TODO ask renderer worker asynchronously if sidebar is visible

  const { sideBarVisible, currentViewletId } = state
  if (sideBarVisible) {
    if (currentViewletId === viewletId) {
      await RendererWorker.invoke('Layout.hideSideBar')
    } else {
      await RendererWorker.invoke(/* SideBar.show */ 'SideBar.show', /* id */ viewletId)
    }
  } else {
    // TODO should show side bar with viewletId
    // @ts-ignore
    await RendererWorker.invoke('Layout.showSideBar')
  }
  return state
}

export const handleClick = async (state: ActivityBarState, button: number, index: number, x: number, y: number): Promise<ActivityBarState> => {
  if (button !== MouseEventType.LeftClick) {
    return state
  }
  const { activityBarItems } = state
  const item = activityBarItems[index]
  const viewletId = item.id
  switch (viewletId) {
    case 'Settings':
      return handleClickSettings(state, x, y, viewletId)
    case 'Additional Views':
      return handleClickAdditionalViews(state, x, y, viewletId)
    default:
      return handleClickOther(state, x, y, viewletId)
  }
}
