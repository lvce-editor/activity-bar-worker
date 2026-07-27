import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

const runHandleContextMenu = async (state: ActivityBarState, button: number, eventX: number, eventY: number): Promise<ActivityBarState> => {
  const { uid } = state
  ActivityBarStates.set(uid, state, state)
  const command = ActivityBarStates.wrapAsyncCommand(handleContextMenu)
  await command(uid, button, eventX, eventY)
  return ActivityBarStates.get(uid).newState
}

test('handleContextMenu calls ContextMenu.show with correct parameters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
    'Layout.getSideBarPosition'() {
      return 1
    },
  })
  const state: ActivityBarState = createDefaultState()

  await runHandleContextMenu(state, 2, 100, 200)

  expect(mockRpc.invocations).toEqual([
    ['Layout.getSideBarPosition'],
    ['ContextMenu.show2', 0, MenuEntryId.ActivityBar, 100, 200, { menuId: MenuEntryId.ActivityBar }],
  ])
})

test('handleContextMenu updates the side bar location before showing the menu', async () => {
  const state: ActivityBarState = createDefaultState()
  const { uid } = state
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {
      expect(ActivityBarStates.get(uid).newState.sideBarLocation).toBe(2)
    },
    'Layout.getSideBarPosition'() {
      return 2
    },
  })

  const result = await runHandleContextMenu(state, 2, 100, 200)

  expect(result).toEqual({
    ...state,
    sideBarLocation: 2,
  })
  expect(mockRpc.invocations).toEqual([
    ['Layout.getSideBarPosition'],
    ['ContextMenu.show2', 0, MenuEntryId.ActivityBar, 100, 200, { menuId: MenuEntryId.ActivityBar }],
  ])
})

test('handleContextMenu calls ContextMenu.show with right button', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
    'Layout.getSideBarPosition'() {
      return 1
    },
  })
  const state: ActivityBarState = createDefaultState()

  await runHandleContextMenu(state, 2, 50, 75)

  expect(mockRpc.invocations).toEqual([
    ['Layout.getSideBarPosition'],
    ['ContextMenu.show2', 0, MenuEntryId.ActivityBar, 50, 75, { menuId: MenuEntryId.ActivityBar }],
  ])
})

test('handleContextMenu handles different coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
    'Layout.getSideBarPosition'() {
      return 1
    },
  })
  const state: ActivityBarState = createDefaultState()

  await runHandleContextMenu(state, 2, 0, 0)
  await runHandleContextMenu(state, 2, 500, 1000)

  expect(mockRpc.invocations).toEqual([
    ['Layout.getSideBarPosition'],
    ['ContextMenu.show2', 0, MenuEntryId.ActivityBar, 0, 0, { menuId: MenuEntryId.ActivityBar }],
    ['Layout.getSideBarPosition'],
    ['ContextMenu.show2', 0, MenuEntryId.ActivityBar, 500, 1000, { menuId: MenuEntryId.ActivityBar }],
  ])
})
