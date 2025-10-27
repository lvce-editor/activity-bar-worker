import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

test('handleContextMenu calls ContextMenu.show with correct parameters', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const state: ActivityBarState = createDefaultState()

  await handleContextMenu(state, 2, 100, 200)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 100, 200, MenuEntryId.ActivityBar, []]])
})

test('handleContextMenu returns the same state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const state: ActivityBarState = createDefaultState()

  const result = await handleContextMenu(state, 2, 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 100, 200, MenuEntryId.ActivityBar, []]])
})

test('handleContextMenu calls ContextMenu.show with right button', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const state: ActivityBarState = createDefaultState()

  await handleContextMenu(state, 2, 50, 75)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 50, 75, MenuEntryId.ActivityBar, []]])
})

test('handleContextMenu handles different coordinates', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })
  const state: ActivityBarState = createDefaultState()

  await handleContextMenu(state, 2, 0, 0)
  await handleContextMenu(state, 2, 500, 1000)

  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show', 0, 0, MenuEntryId.ActivityBar, []],
    ['ContextMenu.show', 500, 1000, MenuEntryId.ActivityBar, []],
  ])
})
