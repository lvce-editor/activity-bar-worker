import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as SideBar from '../SideBar/SideBar.ts'

export const handleClickOther = async (state: ActivityBarState, x: number, y: number, viewletId: string): Promise<ActivityBarState> => {
  const { sideBarVisible, currentViewletId } = state
  if (sideBarVisible) {
    if (currentViewletId === viewletId) {
      await SideBar.hide()
    } else {
      await SideBar.show(viewletId)
    }
  } else {
    await SideBar.show(currentViewletId)
  }
  return state
}
