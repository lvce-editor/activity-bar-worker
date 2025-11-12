import { expect, test } from '@jest/globals'
import { MenuEntryId, MouseEventType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getFilteredActivityBarItems } from '../src/parts/GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { handleClick } from '../src/parts/HandleClick/HandleClick.ts'

test('handleClick calculates index correctly for first item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Settings', title: 'Settings', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    y: 100,
    itemHeight: 48,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 0, 100)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 0, 100, MenuEntryId.Settings, []]])
})

test('handleClick calculates index correctly for second item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
    'Layout.showSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [
    { id: 'Explorer', title: 'Explorer', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'Settings', title: 'Settings', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    y: 0,
    itemHeight: 48,
    sideBarVisible: false,
    currentViewletId: '',
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }
  // Settings is at the bottom: y + height - itemHeight = 0 + 400 - 48 = 352
  const settingsY = state.y + state.height - state.itemHeight

  const result = await handleClick(state, MouseEventType.LeftClick, 0, settingsY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 0, settingsY, MenuEntryId.Settings, []]])
})

test('handleClick calculates index correctly for multiple items', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [
    { id: 'Explorer', title: 'Explorer', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'Search', title: 'Search', icon: 'icon2', flags: 0, keyShortcuts: '' },
    { id: 'Explorer2', title: 'Explorer2', icon: 'icon3', flags: 0, keyShortcuts: '' },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    y: 50,
    itemHeight: 48,
    sideBarVisible: false,
    currentViewletId: '',
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }
  // Click on Explorer (index 0) at the top: y + 0 * itemHeight = 50
  const explorerY = state.y

  const result = await handleClick(state, MouseEventType.LeftClick, 0, explorerY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.showSideBar', '']])
})

test('handleClick returns same state when button is not left click', async () => {
  const items: readonly ActivityBarItem[] = [{ id: 'Settings', title: 'Settings', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    y: 0,
    itemHeight: 48,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClick(state, MouseEventType.Keyboard, 0, 0)

  expect(result).toBe(state)
})

test('handleClick returns same state when index is -1', async () => {
  const items: readonly ActivityBarItem[] = [{ id: 'Settings', title: 'Settings', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    y: 100,
    itemHeight: 48,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 0, 2000)

  expect(result).toBe(state)
})

test('handleClick handles Explorer viewlet click', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Explorer', title: 'Explorer', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarVisible: false,
    currentViewletId: '',
    y: 100,
    itemHeight: 48,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 0, 100)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.showSideBar', '']])
})

test('handleClick handles Additional Views viewlet click', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Additional Views', title: 'Additional Views', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    y: 100,
    itemHeight: 48,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 0, 100)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 0, 100, MenuEntryId.ActivityBarAdditionalViews, []]])
})

test('handleClick handles different y and itemHeight values', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Settings', title: 'Settings', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    y: 200,
    itemHeight: 64,
    filteredItems: getFilteredActivityBarItems(items, 400, 64),
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 64, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 64, 200, MenuEntryId.Settings, []]])
})
