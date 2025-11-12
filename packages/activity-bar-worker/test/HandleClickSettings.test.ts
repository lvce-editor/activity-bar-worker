import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSettings } from '../src/parts/HandleClickSettings/HandleClickSettings.ts'

test('handleClickSettings calls ContextMenu.show with correct parameters', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  const result = await handleClickSettings(state, 100, 200, 'Settings')

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 100, 200, { menuId: MenuEntryId.Settings }]])
  expect(result).toBe(state)
})

test('handleClickSettings returns the same state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  const result = await handleClickSettings(state, 50, 75, 'Settings')

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 50, 75, { menuId: MenuEntryId.Settings }]])
})

test('handleClickSettings calls ContextMenu.show with different coordinates', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  await handleClickSettings(state, 0, 0, 'Settings')
  await handleClickSettings(state, 500, 1000, 'Settings')

  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show2', 0, MenuEntryId.Settings, 0, 0, { menuId: MenuEntryId.Settings }],
    ['ContextMenu.show2', 0, MenuEntryId.Settings, 500, 1000, { menuId: MenuEntryId.Settings }],
  ])
})

test('handleClickSettings calls with Settings MenuEntryId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  await handleClickSettings(state, 10, 20, 'Settings')

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 10, 20, { menuId: MenuEntryId.Settings }]])
})

test('handleClickSettings preserves state regardless of viewletId', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = createDefaultState()

  const result1 = await handleClickSettings(state, 100, 200, 'Settings')
  const result2 = await handleClickSettings(state, 100, 200, 'DifferentViewlet')

  expect(result1).toBe(state)
  expect(result2).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show2', 0, MenuEntryId.Settings, 100, 200, { menuId: MenuEntryId.Settings }],
    ['ContextMenu.show2', 0, MenuEntryId.Settings, 100, 200, { menuId: MenuEntryId.Settings }],
  ])
})
