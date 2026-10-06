import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { setAiNativeLayout } from '../src/parts/SetAiNativeLayout/SetAiNativeLayout.ts'

const makeItem = (id: string): ActivityBarItem => ({
  badgeIcon: '',
  badgeText: '',
  customIconClass: '',
  customIconUrl: '',
  enabled: true,
  flags: ActivityBarItemFlags.Enabled,
  hasPopup: false,
  icon: id,
  id,
  keyShortcuts: '',
  preferredLocation: 0,
  title: id,
})

const createState = (): ActivityBarState => {
  return {
    accountEnabled: true,
    activityBarItems: ['Explorer', 'Chat', 'Account', 'Settings'].map(makeItem),
    aiNativeLayout: false,
    currentViewletId: 'Explorer',
    filteredItems: [],
    focus: 0,
    focused: false,
    focusedIndex: -1,
    height: 600,
    initial: false,
    itemHeight: 48,
    numberOfVisibleItems: 0,
    platform: 0,
    scrollBarHeight: 0,
    selectedIndex: 0,
    sideBarLocation: 0,
    sideBarVisible: true,
    uid: 1,
    updateProgress: 0,
    updateState: '',
    userLoginProvider: '',
    userLoginState: 'logged out',
    userName: '',
    width: 48,
    x: 0,
    y: 0,
  }
}

test('setAiNativeLayout filters ordinary and contributed views, then restores them', () => {
  const state = createState()
  const { activityBarItems } = state

  const aiNative = setAiNativeLayout(state, true)
  expect(aiNative.filteredItems.map((item) => item.id)).toEqual(['Account', 'Settings'])
  expect(aiNative.activityBarItems).toBe(activityBarItems)

  const ide = setAiNativeLayout(aiNative, false)
  expect(ide.filteredItems.map((item) => item.id)).toEqual(['Explorer', 'Chat', 'Account', 'Settings'])
})
