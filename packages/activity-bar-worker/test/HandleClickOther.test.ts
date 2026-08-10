import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getActiveViewIds } from '../src/parts/GetActiveViewIds/GetActiveViewIds.ts'
import { getFilteredActivityBarItems } from '../src/parts/GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { handleClickOther } from '../src/parts/HandleClickOther/HandleClickOther.ts'
import { markSelected } from '../src/parts/MarkSelected/MarkSelected.ts'

test('handleClickOther toggles sidebar view when sidebar is visible and currentViewletId matches viewletId', async () => {
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
    currentViewletId: 'test-viewlet',
    filteredItems: [],
    selectedIndex: -1,
    sideBarVisible: false,
  })
})

test('handleClickOther toggles sidebar view when sidebar is visible and currentViewletId differs from viewletId', async () => {
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
    activityBarItems: [],
    currentViewletId: 'new-viewlet',
    filteredItems: [],
    selectedIndex: -1,
    sideBarVisible: true,
  })
})

test('handleClickOther toggles sidebar view when sidebar is not visible', async () => {
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
  using mockRpc = RendererWorker.registerMockRpc({
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
    currentViewletId: '',
    filteredItems: [],
    selectedIndex: -1,
    sideBarVisible: false,
  })
})

test('handleClickOther activates a preview-preferred view without replacing the active side bar view', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.toggleSideBarView'() {},
  })
  const activityBarItems: readonly ActivityBarItem[] = [
    { flags: ActivityBarItemFlags.Selected, icon: 'files', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
    { flags: 0, icon: 'chat', id: 'chat.voice', keyShortcuts: '', preferredLocation: 'preview', title: 'Voice Chat' },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems,
    currentViewletId: 'Explorer',
    filteredItems: activityBarItems,
    selectedIndex: 0,
    sideBarVisible: true,
  }

  const result = await handleClickOther(state, 'chat.voice')

  expect(mockRpc.invocations).toEqual([['Layout.toggleSideBarView', 'chat.voice']])
  expect(getActiveViewIds(result.activityBarItems)).toEqual(['Explorer', 'chat.voice'])
  expect(result.currentViewletId).toBe('Explorer')
  expect(result.selectedIndex).toBe(0)
  expect(result.sideBarVisible).toBe(true)
  expect(result.activityBarItems.every((item) => item.flags & ActivityBarItemFlags.Selected)).toBe(true)
})

test('handleClickOther deactivates a preview-preferred view without hiding the side bar', async () => {
  RendererWorker.registerMockRpc({
    'Layout.toggleSideBarView'() {},
  })
  const activityBarItems: readonly ActivityBarItem[] = [
    { flags: ActivityBarItemFlags.Selected, icon: 'files', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
    {
      flags: ActivityBarItemFlags.Selected,
      icon: 'chat',
      id: 'chat.voice',
      keyShortcuts: '',
      preferredLocation: 'preview',
      title: 'Voice Chat',
    },
  ]
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems,
    currentViewletId: 'Explorer',
    filteredItems: activityBarItems,
    selectedIndex: 0,
    sideBarVisible: true,
  }

  const result = await handleClickOther(state, 'chat.voice')

  expect(getActiveViewIds(result.activityBarItems)).toEqual(['Explorer'])
  expect(result.sideBarVisible).toBe(true)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBe(0)
})
