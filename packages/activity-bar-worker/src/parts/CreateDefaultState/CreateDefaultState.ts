import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const createDefaultState = (): ActivityBarState => ({
  activityBarItems: [],
  currentViewletId: '',
  filteredItems: [],
  focus: 0,
  focused: false,
  focusedIndex: 0,
  height: 400,
  itemHeight: 48,
  numberOfVisibleItems: 0,
  platform: 0,
  scrollBarHeight: 0,
  selectedIndex: -1,
  sideBarLocation: 0,
  sideBarVisible: false,
  uid: 0,
  updateProgress: 0,
  updateState: '',
  width: 48,
  x: 0,
  y: 0,
})
