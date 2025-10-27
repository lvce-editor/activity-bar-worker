import { expect, test } from '@jest/globals'
import { MenuEntryId, MouseEventType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickIndex } from '../src/parts/HandleClickIndex/HandleClickIndex.ts'

test('handleClickIndex returns same state for non-left click', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'Settings', title: 'Settings', icon: 'icon', flags: 0, keyShortcuts: '' }],
  }

  const result = await handleClickIndex(state, MouseEventType.Keyboard, 0, 10, 20)

  expect(result).toBe(state)
})

test('handleClickIndex returns same state when index is -1', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'Settings', title: 'Settings', icon: 'icon', flags: 0, keyShortcuts: '' }],
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, -1, 10, 20)

  expect(result).toBe(state)
})

test('handleClickIndex handles Settings viewlet click', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Settings', title: 'Settings', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 10, 20)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 10, 20, MenuEntryId.Settings, []]])
})

test('handleClickIndex handles Additional Views viewlet click', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Additional Views', title: 'Additional Views', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 100, 200, MenuEntryId.ActivityBarAdditionalViews, []]])
})

test('handleClickIndex handles other viewlet click when sidebar is hidden', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Explorer', title: 'Explorer', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarVisible: false,
    currentViewletId: '',
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 50, 75)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.showSideBar', '']])
})

test('handleClickIndex handles other viewlet click when sidebar is visible and different viewlet selected', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Explorer', title: 'Explorer', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarVisible: true,
    currentViewletId: 'Search',
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 30, 40)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'Explorer']])
})

test('handleClickIndex handles other viewlet click when same viewlet is already selected', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {},
  })
  const items: readonly ActivityBarItem[] = [{ id: 'Explorer', title: 'Explorer', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarVisible: true,
    currentViewletId: 'Explorer',
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 0, 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
})

test('handleClickIndex handles different indices in items array', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const items: readonly ActivityBarItem[] = [
    { id: 'Other', title: 'Other', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'Settings', title: 'Settings', icon: 'icon2', flags: 0, keyShortcuts: '' },
    { id: 'Additional Views', title: 'Additional Views', icon: 'icon3', flags: 0, keyShortcuts: '' },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
  }

  const result = await handleClickIndex(state, MouseEventType.LeftClick, 1, 15, 25)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 15, 25, MenuEntryId.Settings, []]])
})
