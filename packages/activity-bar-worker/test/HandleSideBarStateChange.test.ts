import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getActiveViewIds } from '../src/parts/GetActiveViewIds/GetActiveViewIds.ts'
import { handleSideBarStateChange } from '../src/parts/HandleSideBarStateChange/HandleSideBarStateChange.ts'

test('handleSideBarStateChange clears the sidebar selection and focus when the sidebar is hidden', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return false
    },
  })
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected | ActivityBarItemFlags.Focused,
      hasPopup: false,
      icon: 'icon2',
      id: 'item2',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 2',
    },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'item2',
    focusedIndex: 1,
    selectedIndex: 1,
    sideBarVisible: true,
  }

  const result = await handleSideBarStateChange(state)

  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible']])
  expect(result).toEqual({
    ...state,
    activityBarItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected,
        hasPopup: false,
        icon: 'icon1',
        id: 'item1',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Item 1',
      },
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Enabled,
        hasPopup: false,
        icon: 'icon2',
        id: 'item2',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Item 2',
      },
    ],
    filteredItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected,
        hasPopup: false,
        icon: 'icon1',
        id: 'item1',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Item 1',
      },
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Enabled,
        hasPopup: false,
        icon: 'icon2',
        id: 'item2',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Item 2',
      },
    ],
    focusedIndex: -1,
    selectedIndex: -1,
    sideBarVisible: false,
  })
})

test('handleSideBarStateChange marks the requested viewlet when sidebar is visible', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return true
    },
  })
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Tab,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Tab,
      hasPopup: false,
      icon: 'icon2',
      id: 'item2',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 2',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Tab,
      hasPopup: false,
      icon: 'icon3',
      id: 'item3',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 3',
    },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'item1',
    focused: true,
    focusedIndex: 2,
    selectedIndex: 0,
    sideBarVisible: false,
  }

  const result = await handleSideBarStateChange(state, 'item2')

  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible']])
  expect(result.selectedIndex).toBe(1)
  expect(result.currentViewletId).toBe('item2')
  expect(result.sideBarVisible).toBe(true)
  expect(result.focused).toBe(false)
  expect(result.focusedIndex).toBe(2)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result.activityBarItems[2].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('handleSideBarStateChange preserves activity bar focus when the requested viewlet is unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return true
    },
  })
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'item1',
    focused: true,
    focusedIndex: 0,
    selectedIndex: 0,
    sideBarVisible: true,
  }

  const result = await handleSideBarStateChange(state, 'item1')

  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible']])
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(0)
})

test('handleSideBarStateChange sets selectedIndex to -1 when requested viewlet is missing', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return true
    },
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Enabled,
        hasPopup: false,
        icon: 'icon1',
        id: 'item1',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Item 1',
      },
    ],
    selectedIndex: 0,
  }

  const result = await handleSideBarStateChange(state, 'missing')

  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible']])
  expect(result.selectedIndex).toBe(-1)
  expect(result.sideBarVisible).toBe(true)
})

test('handleSideBarStateChange uses explicit hidden visibility without querying layout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected | ActivityBarItemFlags.Focused,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'item1',
    focusedIndex: 0,
    selectedIndex: 0,
    sideBarVisible: true,
  }

  const result = await handleSideBarStateChange(state, 'item1', false)

  expect(mockRpc.invocations).toEqual([])
  expect(result).toEqual({
    ...state,
    activityBarItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Enabled,
        hasPopup: false,
        icon: 'icon1',
        id: 'item1',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Item 1',
      },
    ],
    filteredItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Enabled,
        hasPopup: false,
        icon: 'icon1',
        id: 'item1',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Item 1',
      },
    ],
    focusedIndex: -1,
    selectedIndex: -1,
    sideBarVisible: false,
  })
})

test('handleSideBarStateChange switches the side bar while preserving another active view', async () => {
  RendererWorker.registerMockRpc({})
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'files',
      id: 'Explorer',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'search',
      id: 'Search',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Search',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'chat',
      id: 'chat.voice',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Voice Chat',
    },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'Explorer',
    selectedIndex: 0,
    sideBarVisible: true,
  }

  const result = await handleSideBarStateChange(state, 'Search', true)

  expect(getActiveViewIds(result.activityBarItems)).toEqual(['Search', 'chat.voice'])
  expect(result.selectedIndex).toBe(1)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBe(0)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
  expect(result.activityBarItems[2].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
})

test('handleSideBarStateChange hides the side bar while preserving another active view', async () => {
  RendererWorker.registerMockRpc({})
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'files',
      id: 'Explorer',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'chat',
      id: 'chat.voice',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Voice Chat',
    },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'Explorer',
    selectedIndex: 0,
    sideBarVisible: true,
  }

  const result = await handleSideBarStateChange(state, 'Explorer', false)

  expect(getActiveViewIds(result.activityBarItems)).toEqual(['chat.voice'])
  expect(result.selectedIndex).toBe(-1)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBe(0)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
})

test('handleSideBarStateChange ignores a missing sidebar item and preserves another active view', async () => {
  RendererWorker.registerMockRpc({})
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'chat',
      id: 'chat.voice',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Voice Chat',
    },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'Explorer',
  }

  const result = await handleSideBarStateChange(state, 'missing', true)

  expect(getActiveViewIds(result.activityBarItems)).toEqual(['chat.voice'])
  expect(result.selectedIndex).toBe(-1)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
})

test('handleSideBarStateChange enables and selects the on-demand References item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
        hasPopup: false,
        icon: 'Files',
        id: 'Explorer',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Explorer',
      },
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Tab,
        hasPopup: false,
        icon: 'References',
        id: 'References',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'References',
      },
    ],
  }

  const result = await handleSideBarStateChange(state, 'References', true)

  expect(mockRpc.invocations).toEqual([])
  expect(result.selectedIndex).toBe(1)
  expect(result.currentViewletId).toBe('References')
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Enabled).toBe(ActivityBarItemFlags.Enabled)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
  expect(result.filteredItems.map((item) => item.id)).toEqual(['Explorer', 'References'])
})

test('handleSideBarStateChange keeps References enabled after switching away', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
        hasPopup: false,
        icon: 'Files',
        id: 'Explorer',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Explorer',
      },
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Tab,
        hasPopup: false,
        icon: 'References',
        id: 'References',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'References',
      },
    ],
  }

  const referencesState = await handleSideBarStateChange(state, 'References', true)
  const result = await handleSideBarStateChange(referencesState, 'Explorer', true)

  expect(mockRpc.invocations).toEqual([])
  expect(result.selectedIndex).toBe(0)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Enabled).toBe(ActivityBarItemFlags.Enabled)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBe(0)
  expect(result.filteredItems.map((item) => item.id)).toEqual(['Explorer', 'References'])
})

test('handleSideBarStateChange does not automatically re-enable other hidden items', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Tab,
        hasPopup: false,
        icon: 'Search',
        id: 'Search',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Search',
      },
    ],
  }

  const result = await handleSideBarStateChange(state, 'Search', true)

  expect(mockRpc.invocations).toEqual([])
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Enabled).toBe(0)
  expect(result.filteredItems).toEqual([])
})
