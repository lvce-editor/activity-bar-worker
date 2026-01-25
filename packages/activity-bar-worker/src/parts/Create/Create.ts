import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ExplorerStates from '../ActivityBarStates/ActivityBarStates.ts'

// TODO parentUid might ot be needed
export const create = (
  id: number,
  uri: string,
  x: number,
  y: number,
  width: number,
  height: number,
  args: any,
  parentUid: any,
  platform: number = 0,
): any => {
  const state: ActivityBarState = {
    accountEnabled: false,
    activityBarItems: [],
    currentViewletId: '',
    filteredItems: [],
    focus: 0,
    focused: false,
    focusedIndex: -1,
    height,
    initial: true,
    itemHeight: 48,
    numberOfVisibleItems: 0,
    platform,
    scrollBarHeight: 0,
    selectedIndex: -1,
    sideBarLocation: 0,
    sideBarVisible: false,
    uid: id,
    updateProgress: 0,
    updateState: '',
    width,
    x,
    y,
  }
  ExplorerStates.set(id, state, state)
  return state
}
