import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSignIn } from '../src/parts/HandleClickSignIn/HandleClickSignIn.ts'

test.skip('handleClickSignIn returns the same state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const state: ActivityBarState = createDefaultState()

  const result = await handleClickSignIn(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
