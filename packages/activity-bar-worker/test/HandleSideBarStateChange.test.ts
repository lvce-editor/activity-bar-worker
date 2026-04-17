import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSideBarStateChange } from '../src/parts/HandleSideBarStateChange/HandleSideBarStateChange.ts'

test('handleSideBarStateChange clears selected and focused state when sidebar is hidden', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return false
    },
  })
  const items: readonly ActivityBarItem[] = [
    { flags: ActivityBarItemFlags.Selected, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: ActivityBarItemFlags.Selected | ActivityBarItemFlags.Focused, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
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
      { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
      { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    ],
    filteredItems: [
      { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
      { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
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
    { flags: ActivityBarItemFlags.Tab, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: ActivityBarItemFlags.Tab, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: ActivityBarItemFlags.Tab, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
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
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(2)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result.activityBarItems[2].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('handleSideBarStateChange sets selectedIndex to -1 when requested viewlet is missing', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return true
    },
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }],
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
    { flags: ActivityBarItemFlags.Selected | ActivityBarItemFlags.Focused, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
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
    activityBarItems: [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }],
    filteredItems: [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }],
    focusedIndex: -1,
    selectedIndex: -1,
    sideBarVisible: false,
  })
})
