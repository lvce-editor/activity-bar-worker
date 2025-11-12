import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export interface ActivityBarState {
  readonly activityBarItems: readonly ActivityBarItem[]
  readonly currentViewletId: string
  readonly filteredItems: readonly ActivityBarItem[]
  readonly focus: number
  readonly focused: boolean
  readonly focusedIndex: number
  readonly height: number
  readonly itemHeight: number
  readonly numberOfVisibleItems: number
  readonly scrollBarHeight: any
  readonly selectedIndex: number
  readonly sideBarLocation: number
  readonly sideBarVisible: boolean
  readonly uid: number
  readonly updateProgress: number
  readonly updateState: any
  readonly width: number
  readonly x: number
  readonly y: number
}
