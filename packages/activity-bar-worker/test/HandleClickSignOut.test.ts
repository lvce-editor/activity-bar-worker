import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSignOut } from '../src/parts/HandleClickSignOut/HandleClickSignOut.ts'

test('handleClickSignOut delegates to layout signOut and returns the same state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.signOut': async () => undefined,
  })
  const state: ActivityBarState = createDefaultState()

  const result = await handleClickSignOut(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.signOut']])
})
