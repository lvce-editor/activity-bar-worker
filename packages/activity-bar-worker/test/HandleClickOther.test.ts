import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getFilteredActivityBarItems } from '../src/parts/GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { handleClickOther } from '../src/parts/HandleClickOther/HandleClickOther.ts'
import { markSelected } from '../src/parts/MarkSelected/MarkSelected.ts'

test('handleClickOther calls SideBar.hide when sidebar is visible and currentViewletId matches viewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.toggleSideBarView'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'test-viewlet',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 'test-viewlet')

  expect(mockRpc.invocations).toEqual([['Layout.toggleSideBarView', 'test-viewlet']])
  expect(result).toEqual({
    ...state,
    activityBarItems: [],
    filteredItems: [],
    currentViewletId: 'test-viewlet',
    selectedIndex: -1,
    sideBarVisible: false,
  })
})

test('handleClickOther calls SideBar.show when sidebar is visible and currentViewletId differs from viewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.toggleSideBarView'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'current-viewlet',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 'new-viewlet')

  expect(mockRpc.invocations).toEqual([['Layout.toggleSideBarView', 'new-viewlet']])
  expect(result).toEqual({
    ...state,
    currentViewletId: 'new-viewlet',
    filteredItems: [],
    selectedIndex: -1,
    sideBarVisible: true,
  })
})

test('handleClickOther calls Layout.showSideBar when sidebar is not visible', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.toggleSideBarView'() {},
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

  expect(mockRpc.invocations).toEqual([['Layout.toggleSideBarView', 'new-viewlet']])
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
  RendererWorker.registerMockRpc({
    'Layout.toggleSideBarView'() {},
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
    'Layout.toggleSideBarView'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: '',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, '')

  expect(mockRpc.invocations).toEqual([['Layout.toggleSideBarView', '']])
  expect(result).toEqual({
    ...state,
    activityBarItems: [],
    filteredItems: [],
    currentViewletId: '',
    selectedIndex: -1,
    sideBarVisible: false,
  })
})

test('handleClickOther can show hide and show the same viewlet again', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.toggleSideBarView'() {},
  })
  const activityBarItems: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon', id: 'Explorer', keyShortcuts: '', title: 'Explorer' }]
  const initialState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems,
    currentViewletId: 'Explorer',
    filteredItems: getFilteredActivityBarItems(activityBarItems, 400, 48),
    sideBarVisible: false,
  }

  const openedState = await handleClickOther(initialState, 'Explorer')
  const hiddenState = await handleClickOther(openedState, 'Explorer')
  const reopenedState = await handleClickOther(hiddenState, 'Explorer')
  const selectedItems = markSelected(activityBarItems, 0)
  const selectedFilteredItems = getFilteredActivityBarItems(selectedItems, 400, 48)

  expect(mockRpc.invocations).toEqual([
    ['Layout.toggleSideBarView', 'Explorer'],
    ['Layout.toggleSideBarView', 'Explorer'],
    ['Layout.toggleSideBarView', 'Explorer'],
  ])
  expect(hiddenState).toEqual({
    ...openedState,
    activityBarItems: markSelected(selectedItems, -1),
    filteredItems: getFilteredActivityBarItems(markSelected(selectedItems, -1), 400, 48),
    selectedIndex: -1,
    sideBarVisible: false,
  })
  expect(reopenedState).toEqual({
    ...hiddenState,
    activityBarItems: selectedItems,
    currentViewletId: 'Explorer',
    filteredItems: selectedFilteredItems,
    selectedIndex: 0,
    sideBarVisible: true,
  })
})
