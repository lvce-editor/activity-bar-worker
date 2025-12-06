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
    'ContextMenu.show2'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Settings', keyShortcuts: '', title: 'Settings' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    itemHeight: 48,
    y: 100,
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 0, 100)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 0, 100, { menuId: MenuEntryId.Settings }]])
})

test('handleClick calculates index correctly for second item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
    'Layout.showSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
    { flags: 0, icon: 'icon2', id: 'Settings', keyShortcuts: '', title: 'Settings' },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: '',
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    itemHeight: 48,
    sideBarVisible: false,
    y: 0,
  }
  // Settings is at the bottom: y + height - itemHeight = 0 + 400 - 48 = 352
  const settingsY = state.y + state.height - state.itemHeight

  const result = await handleClick(state, MouseEventType.LeftClick, 0, settingsY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 0, settingsY, { menuId: MenuEntryId.Settings }]])
})

test('handleClick calculates index correctly for multiple items', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
    { flags: 0, icon: 'icon2', id: 'Search', keyShortcuts: '', title: 'Search' },
    { flags: 0, icon: 'icon3', id: 'Explorer2', keyShortcuts: '', title: 'Explorer2' },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: '',
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    itemHeight: 48,
    sideBarVisible: false,
    y: 50,
  }
  // Click on Explorer (index 0) at the top: y + 0 * itemHeight = 50
  const explorerY = state.y

  const result = await handleClick(state, MouseEventType.LeftClick, 0, explorerY)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.showSideBar', '']])
})

test('handleClick returns same state when button is not left click', async () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Settings', keyShortcuts: '', title: 'Settings' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    itemHeight: 48,
    y: 0,
  }

  const result = await handleClick(state, MouseEventType.Keyboard, 0, 0)

  expect(result).toBe(state)
})

test('handleClick returns same state when index is -1', async () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Settings', keyShortcuts: '', title: 'Settings' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    itemHeight: 48,
    y: 100,
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 0, 2000)

  expect(result).toBe(state)
})

test('handleClick handles Explorer viewlet click', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Explorer', keyShortcuts: '', title: 'Explorer' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: '',
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    itemHeight: 48,
    sideBarVisible: false,
    y: 100,
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 0, 100)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.showSideBar', '']])
})

test('handleClick handles Additional Views viewlet click', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Additional Views', keyShortcuts: '', title: 'Additional Views' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    itemHeight: 48,
    y: 100,
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 0, 100)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      0,
      MenuEntryId.ActivityBarAdditionalViews,
      0,
      100,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Additional Views' },
    ],
  ])
})

test('handleClick handles different y and itemHeight values', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Settings', keyShortcuts: '', title: 'Settings' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 64),
    itemHeight: 64,
    y: 200,
  }

  const result = await handleClick(state, MouseEventType.LeftClick, 64, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 64, 200, { menuId: MenuEntryId.Settings }]])
})
