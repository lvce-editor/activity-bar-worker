import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getActiveView } from '../src/parts/GetActiveView/GetActiveView.ts'
import * as ViewletModuleId from '../src/parts/ViewletModuleId/ViewletModuleId.ts'

test('getActiveView returns the active view from Layout.getActiveSideBarView', async () => {
  const mockActiveView = 'test-view'
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getActiveSideBarView'() {
      return mockActiveView
    },
  })

  const result = await getActiveView()

  expect(mockRpc.invocations).toEqual([['Layout.getActiveSideBarView']])
  expect(result).toBe(mockActiveView)
})

test('getActiveView returns Explorer as fallback when invoke fails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getActiveSideBarView'() {
      throw new Error('Failed to get active view')
    },
  })

  const result = await getActiveView()

  expect(mockRpc.invocations).toEqual([['Layout.getActiveSideBarView']])
  expect(result).toBe(ViewletModuleId.Explorer)
})
