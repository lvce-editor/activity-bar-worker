import { expect, test } from '@jest/globals'
import { AuthWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSignIn } from '../src/parts/HandleClickSignIn/HandleClickSignIn.ts'

test('handleClickSignIn logs in with backend url and returns the same state', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Layout.getBackendUrl'() {
      return 'https://example.com'
    },
  })
  using authRpc = AuthWorker.registerMockRpc({
    'Auth.login'() {},
  })
  const state: ActivityBarState = createDefaultState()

  const result = await handleClickSignIn(state)

  expect(result).toBe(state)
  expect(rendererRpc.invocations).toEqual([['Layout.getBackendUrl']])
  expect(authRpc.invocations).toEqual([
    ['Auth.login', { backendUrl: 'https://example.com', platform: state.platform }],
  ])
})
