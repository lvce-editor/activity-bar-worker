import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getAccountEnabled } from '../src/parts/GetAccountEnabled/GetAccountEnabled.ts'

test('getAccountEnabled returns the default value for a non-boolean preference', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'() {
      return 'invalid'
    },
  })

  const result = await getAccountEnabled(false)

  expect(mockRpc.invocations).toEqual([['Preferences.get', 'activityBar.accountEnabled']])
  expect(result).toBe(false)
})
