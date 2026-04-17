import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getFilteredActivityBarItems } from '../src/parts/GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { handleClickOther } from '../src/parts/HandleClickOther/HandleClickOther.ts'

test('handleClickOther calls SideBar.hide when sidebar is visible and currentViewletId matches viewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'test-viewlet',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 'test-viewlet')

  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
  expect(result).toBe(state)
})

test('handleClickOther calls SideBar.show when sidebar is visible and currentViewletId differs from viewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'current-viewlet',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 'new-viewlet')

  expect(mockRpc.invocations).toEqual([['SideBar.show', 'new-viewlet']])
  expect(result).toBe(state)
})

test('handleClickOther calls Layout.showSideBar when sidebar is not visible', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
    'SideBar.show'() {},
  })
  const activityBarItems: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'new-viewlet', keyShortcuts: '', title: 'New Viewlet' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems,
    currentViewletId: 'test-viewlet',
    filteredItems: getFilteredActivityBarItems(activityBarItems, 400, 48),
    sideBarVisible: false,
  }

  const result: ActivityBarState = await handleClickOther(state, 'new-viewlet')

  expect(mockRpc.invocations).toEqual([
    ['SideBar.show', 'new-viewlet'],
    ['Layout.showSideBar', 'new-viewlet'],
  ])
  expect(result).not.toBe(state)
  expect(result.currentViewletId).toBe('new-viewlet')
  expect(result.selectedIndex).toBe(0)
  expect(result.sideBarVisible).toBe(true)
})

test('handleClickOther preserves state properties', async () => {
  RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
    'SideBar.show'() {},
  })
  const activityBarItems: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'new-viewlet', keyShortcuts: '', title: 'New Viewlet' }]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems,
    currentViewletId: 'test-viewlet',
    filteredItems: getFilteredActivityBarItems(activityBarItems, 400, 48),
    focused: true,
    focusedIndex: 2,
    sideBarVisible: false,
    width: 100,
  }

  const result: ActivityBarState = await handleClickOther(state, 'new-viewlet')

  expect(result).not.toBe(state)
  expect(result.focusedIndex).toBe(2)
  expect(result.focused).toBe(true)
  expect(result.width).toBe(100)
  expect(result.currentViewletId).toBe('new-viewlet')
  expect(result.sideBarVisible).toBe(true)
})

test('handleClickOther handles empty currentViewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: '',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, '')

  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
  expect(result).toBe(state)
})
