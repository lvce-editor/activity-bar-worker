import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const createDefaultState = (): ActivityBarState => ({
  focus: 0,
  focused: false,
  focusedIndex: 0,
  width: 0,
  x: 0,
  y: 0,
  scrollBarHeight: 0,
  uid: 0,
  sideBarVisible: false,
})
