import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSideBarViewletChange } from '../src/parts/HandleSideBarViewletChange/HandleSideBarViewletChange.ts'

test('handleSideBarViewletChange sets selectedIndex to found index', async () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: -1,
  }

  const result: ActivityBarState = await handleSideBarViewletChange(state, 'item2')

  expect(result.selectedIndex).toBe(1)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[2].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result).not.toBe(state)
})

test('handleSideBarViewletChange sets selectedIndex to -1 when item not found', async () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: 0,
  }

  const result: ActivityBarState = await handleSideBarViewletChange(state, 'nonexistent')

  expect(result.selectedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handleSideBarViewletChange preserves other state properties', async () => {
  const items: readonly ActivityBarItem[] = [
    { flags: ActivityBarItemFlags.Tab, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: ActivityBarItemFlags.Tab, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'test-viewlet',
    focused: true,
    focusedIndex: 1,
    selectedIndex: 0,
  }

  const result: ActivityBarState = await handleSideBarViewletChange(state, 'item2')

  expect(result.selectedIndex).toBe(1)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.focused).toBe(state.focused)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBeTruthy()
})

test('handleSideBarViewletChange handles empty activityBarItems', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [],
    selectedIndex: 0,
  }

  const result: ActivityBarState = await handleSideBarViewletChange(state, 'any')

  expect(result.selectedIndex).toBe(-1)
})

test('handleSideBarViewletChange handles first item', async () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'first', keyShortcuts: '', title: 'First' },
    { flags: 0, icon: 'icon2', id: 'second', keyShortcuts: '', title: 'Second' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: -1,
  }

  const result: ActivityBarState = await handleSideBarViewletChange(state, 'first')

  expect(result.selectedIndex).toBe(0)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('handleSideBarViewletChange handles last item', async () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'first', keyShortcuts: '', title: 'First' },
    { flags: 0, icon: 'icon2', id: 'second', keyShortcuts: '', title: 'Second' },
    { flags: 0, icon: 'icon3', id: 'third', keyShortcuts: '', title: 'Third' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: -1,
  }

  const result: ActivityBarState = await handleSideBarViewletChange(state, 'third')

  expect(result.selectedIndex).toBe(2)
  expect(result.activityBarItems[2].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('handleSideBarViewletChange gets sideBarVisible from renderer worker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return false
    },
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }],
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleSideBarViewletChange(state, 'item1')

  expect(mockRpc.invocations).toEqual(expect.arrayContaining([['Layout.getSideBarVisible']]))
  expect(result.sideBarVisible).toBe(false)
})
