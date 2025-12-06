import { expect, test } from '@jest/globals'
import { MenuEntryId, MouseEventType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getFilteredActivityBarItems } from '../src/parts/GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { handleClickIndex } from '../src/parts/HandleClickIndex/HandleClickIndex.ts'

test('handleClickIndex returns same state for non-left click', async () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Settings', keyShortcuts: '', title: 'Settings' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClickIndex(state, MouseEventType.Keyboard, 0, 10, 20)

  expect(result).toBe(state)
})

test('handleClickIndex returns same state when index is -1', async () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Settings', keyShortcuts: '', title: 'Settings' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, -1, 10, 20)

  expect(result).toBe(state)
})

test('handleClickIndex handles Settings viewlet click', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Settings', keyShortcuts: '', title: 'Settings' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 10, 20)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 10, 20, { menuId: MenuEntryId.Settings }]])
})

test('handleClickIndex handles Additional Views viewlet click', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Additional Views', keyShortcuts: '', title: 'Additional Views' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      0,
      MenuEntryId.ActivityBarAdditionalViews,
      100,
      200,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Additional Views' },
    ],
  ])
})

test('handleClickIndex handles other viewlet click when sidebar is hidden', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Explorer', keyShortcuts: '', title: 'Explorer' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: '',
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    sideBarVisible: false,
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 50, 75)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.showSideBar', '']])
})

test('handleClickIndex handles other viewlet click when sidebar is visible and different viewlet selected', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Explorer', keyShortcuts: '', title: 'Explorer' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'Search',
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    sideBarVisible: true,
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 30, 40)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'Explorer']])
})

test('handleClickIndex handles other viewlet click when same viewlet is already selected', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Explorer', keyShortcuts: '', title: 'Explorer' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'Explorer',
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    sideBarVisible: true,
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
})

test('handleClickIndex handles different indices in items array', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'Other', keyShortcuts: '', title: 'Other' },
    { flags: 0, icon: 'icon2', id: 'Settings', keyShortcuts: '', title: 'Settings' },
    { flags: 0, icon: 'icon3', id: 'Additional Views', keyShortcuts: '', title: 'Additional Views' },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 1, 15, 25)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 15, 25, { menuId: MenuEntryId.Settings }]])
})
