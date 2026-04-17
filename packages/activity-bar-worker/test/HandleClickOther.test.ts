import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getFilteredActivityBarItems } from '../src/parts/GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markSelected } from '../src/parts/MarkSelected/MarkSelected.ts'

const { handleClickOther } = await import('../src/parts/HandleClickOther/HandleClickOther.ts')

test('handleClickOther calls SideBar.hide when sidebar is visible and currentViewletId matches viewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.toggle'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'test-viewlet',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 'test-viewlet')

  expect(mockRpc.invocations).toEqual([['SideBar.toggle', 'test-viewlet']])
  expect(result).toEqual({
    ...state,
    activityBarItems: [],
    currentViewletId: 'test-viewlet',
    filteredItems: [],
    selectedIndex: -1,
    sideBarVisible: false,
  })
})

test('handleClickOther calls SideBar.show when sidebar is visible and currentViewletId differs from viewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.toggle'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'current-viewlet',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 'new-viewlet')

  expect(mockRpc.invocations).toEqual([['SideBar.toggle', 'new-viewlet']])
  expect(result).toEqual({
    ...state,
    activityBarItems: [],
    currentViewletId: 'new-viewlet',
    filteredItems: [],
    selectedIndex: -1,
    sideBarVisible: true,
  })
})

test('handleClickOther calls Layout.showSideBar when sidebar is not visible', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.toggle'() {},
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
  const expectedActivityBarItems = markSelected(activityBarItems, 0)
  const expectedFilteredItems = getFilteredActivityBarItems(expectedActivityBarItems, 400, 48)

  expect(mockRpc.invocations).toEqual([['SideBar.toggle', 'new-viewlet']])
  expect(result).toEqual({
    ...state,
    activityBarItems: expectedActivityBarItems,
    currentViewletId: 'new-viewlet',
    filteredItems: expectedFilteredItems,
    selectedIndex: 0,
    sideBarVisible: true,
  })
})

test('handleClickOther preserves state properties', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.toggle'() {},
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
  const expectedActivityBarItems = markSelected(activityBarItems, 0)
  const expectedFilteredItems = getFilteredActivityBarItems(expectedActivityBarItems, 400, 48)

  expect(mockRpc.invocations).toEqual([['SideBar.toggle', 'new-viewlet']])
  expect(result).toEqual({
    ...state,
    activityBarItems: expectedActivityBarItems,
    currentViewletId: 'new-viewlet',
    filteredItems: expectedFilteredItems,
    selectedIndex: 0,
    sideBarVisible: true,
  })
})

test('handleClickOther handles empty currentViewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.toggle'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: '',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, '')

  expect(mockRpc.invocations).toEqual([['SideBar.toggle', '']])
  expect(result).toEqual({
    ...state,
    activityBarItems: [],
    currentViewletId: '',
    filteredItems: [],
    selectedIndex: -1,
    sideBarVisible: false,
  })
})
