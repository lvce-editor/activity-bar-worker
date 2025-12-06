import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickOther } from '../src/parts/HandleClickOther/HandleClickOther.ts'

test('handleClickOther calls SideBar.hide when sidebar is visible and currentViewletId matches viewletId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'test-viewlet',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 10, 20, 'test-viewlet')

  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
  expect(result).toBe(state)
})

test('handleClickOther calls SideBar.show when sidebar is visible and currentViewletId differs from viewletId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'current-viewlet',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 10, 20, 'new-viewlet')

  expect(mockRpc.invocations).toEqual([['SideBar.show', 'new-viewlet']])
  expect(result).toBe(state)
})

test('handleClickOther calls Layout.showSideBar when sidebar is not visible', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'test-viewlet',
    sideBarVisible: false,
  }

  const result: ActivityBarState = await handleClickOther(state, 10, 20, 'new-viewlet')

  expect(mockRpc.invocations).toEqual([['Layout.showSideBar', 'test-viewlet']])
  expect(result).toBe(state)
})

test('handleClickOther preserves state properties', async () => {
  RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'test-viewlet',
    focused: true,
    focusedIndex: 2,
    sideBarVisible: false,
    width: 100,
  }

  const result: ActivityBarState = await handleClickOther(state, 15, 25, 'new-viewlet')

  expect(result).toBe(state)
  expect(result.focusedIndex).toBe(2)
  expect(result.focused).toBe(true)
  expect(result.width).toBe(100)
})

test('handleClickOther handles empty currentViewletId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: '',
    sideBarVisible: true,
  }

  const result: ActivityBarState = await handleClickOther(state, 10, 20, '')

  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
  expect(result).toBe(state)
})
