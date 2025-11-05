import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export interface ActivityBarState {
  readonly activityBarItems: readonly ActivityBarItem[]
  readonly currentViewletId: string
  readonly focus: number
  readonly focused: boolean
  readonly focusedIndex: number
  readonly itemHeight: number
  readonly scrollBarHeight: any
  readonly selectedIndex: number
  readonly sideBarVisible: boolean
  readonly uid: number
  readonly updateProgress: number
  readonly updateState: any
  readonly width: number
  readonly x: number
  readonly y: number
}
