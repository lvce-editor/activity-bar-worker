import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAdditionalViews } from '../src/parts/HandleClickAdditionalViews/HandleClickAdditionalViews.ts'

test('handleClickAdditionalViews calls ContextMenu.show with correct parameters', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  const result = await handleClickAdditionalViews(state, 100, 200, 'Additional Views')

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
  expect(result).toBe(state)
})

test('handleClickAdditionalViews returns the same state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  const result = await handleClickAdditionalViews(state, 50, 75, 'Additional Views')

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      0,
      MenuEntryId.ActivityBarAdditionalViews,
      50,
      75,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Additional Views' },
    ],
  ])
})

test('handleClickAdditionalViews calls ContextMenu.show with different coordinates', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  await handleClickAdditionalViews(state, 0, 0, 'Additional Views')
  await handleClickAdditionalViews(state, 500, 1000, 'Additional Views')

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      0,
      MenuEntryId.ActivityBarAdditionalViews,
      0,
      0,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Additional Views' },
    ],
    [
      'ContextMenu.show2',
      0,
      MenuEntryId.ActivityBarAdditionalViews,
      500,
      1000,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Additional Views' },
    ],
  ])
})

test('handleClickAdditionalViews calls with ActivityBarAdditionalViews MenuEntryId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  await handleClickAdditionalViews(state, 10, 20, 'Additional Views')

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      0,
      MenuEntryId.ActivityBarAdditionalViews,
      10,
      20,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Additional Views' },
    ],
  ])
})

test('handleClickAdditionalViews preserves state regardless of viewletId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  const result1 = await handleClickAdditionalViews(state, 100, 200, 'Additional Views')
  const result2 = await handleClickAdditionalViews(state, 100, 200, 'DifferentViewlet')

  expect(result1).toBe(state)
  expect(result2).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      0,
      MenuEntryId.ActivityBarAdditionalViews,
      100,
      200,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Additional Views' },
    ],
    [
      'ContextMenu.show2',
      0,
      MenuEntryId.ActivityBarAdditionalViews,
      100,
      200,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'DifferentViewlet' },
    ],
  ])
})
