import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getSideBarVisible } from '../src/parts/GetSideBarVisible/GetSideBarVisible.ts'

test('getSideBarVisible returns value from Layout.getSideBarVisible', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return false
    },
  })

  const result = await getSideBarVisible()

  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible']])
  expect(result).toBe(false)
})

test('getSideBarVisible returns true as fallback when invoke fails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      throw new Error('failed to get side bar visible')
    },
  })

  const result = await getSideBarVisible()

  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible']])
  expect(result).toBe(true)
})
