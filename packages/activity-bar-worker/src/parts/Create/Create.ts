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
    currentViewletId: '',
    uid: id,
    focus: 0,
    focused: false,
    focusedIndex: -1,
    scrollBarHeight: 0,
    width: 0,
    x: 0,
    y: 0,
    sideBarVisible: false,
    activityBarItems: [],
    selectedIndex: -1,
    itemHeight: 48,
  }
  ExplorerStates.set(id, state, state)
  return state
}
