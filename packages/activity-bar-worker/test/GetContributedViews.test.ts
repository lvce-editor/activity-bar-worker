import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getContributedViews } from '../src/parts/GetContributedViews/GetContributedViews.ts'

test('getContributedViews excludes document preview views', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getViews'() {
      return [
        {
          icon: '',
          id: 'builtin.media-preview',
          title: 'Media Preview',
          type: 'preview',
        },
        {
          icon: 'symbol-beaker',
          id: 'sample.views.testing',
          title: 'Testing',
        },
      ]
    },
  })

  await expect(getContributedViews(7)).resolves.toEqual([
    {
      icon: 'symbol-beaker',
      id: 'sample.views.testing',
      title: 'Testing',
    },
  ])
  expect(mockRpc.invocations).toEqual([['Extensions.getViews', '', 7]])
})

test('getContributedViews handles invalid results', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getViews'() {
      return undefined
    },
  })

  await expect(getContributedViews(0)).resolves.toEqual([])
  expect(mockRpc.invocations).toEqual([['Extensions.getViews', '', 0]])
})
