import { expect, test } from '@jest/globals'
import { AuthWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSignIn } from '../src/parts/HandleClickSignIn/HandleClickSignIn.ts'

<<<<<<< HEAD
test('handleClickSignIn delegates to layout signIn and returns the same state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.signIn': async () => undefined,
=======
test('handleClickSignIn logs in with backend url and returns the same state', async () => {
  using rendererRpc = RendererWorker.registerMockRpc({
    'Layout.getBackendUrl'() {
      return 'https://example.com'
    },
  })
  using authRpc = AuthWorker.registerMockRpc({
    'Auth.login'() {},
>>>>>>> origin/main
  })
  const state: ActivityBarState = createDefaultState()

  const result = await handleClickSignIn(state)

  expect(result).toBe(state)
<<<<<<< HEAD
  expect(mockRpc.invocations).toEqual([['Layout.signIn']])
=======
  expect(rendererRpc.invocations).toEqual([['Layout.getBackendUrl']])
  expect(authRpc.invocations).toEqual([['Auth.login', { backendUrl: 'https://example.com', platform: state.platform }]])
>>>>>>> origin/main
})
