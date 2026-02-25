import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as SideBar from '../SideBar/SideBar.ts'

export const handleClickOther = async (state: ActivityBarState, viewletId: string): Promise<ActivityBarState> => {
  const { currentViewletId, sideBarVisible } = state
  if (sideBarVisible) {
    if (currentViewletId === viewletId) {
      await SideBar.hide()
      return state
    }
    await SideBar.show(sideBarVisible, viewletId)
    return state
  }
  await SideBar.show(sideBarVisible, currentViewletId)
  return state
}
