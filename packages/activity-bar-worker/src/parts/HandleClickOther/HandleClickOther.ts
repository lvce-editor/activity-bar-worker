import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const handleClickOther = async (state: ActivityBarState, x: number, y: number, viewletId: string): Promise<ActivityBarState> => {
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
