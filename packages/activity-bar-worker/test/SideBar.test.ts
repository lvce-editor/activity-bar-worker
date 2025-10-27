import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { hide, show } from '../src/parts/SideBar/SideBar.ts'

test('show calls SideBar.show when sideBarVisible is true', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {},
  })
  await show(true, 'test-id')
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'test-id']])
})

test('show calls Layout.showSideBar when sideBarVisible is false', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
  })
  await show(false, 'test-id')
  expect(mockRpc.invocations).toEqual([['Layout.showSideBar', 'test-id']])
})

test('hide calls Layout.hideSideBar', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {},
  })
  await hide()
  expect(mockRpc.invocations[0]).toEqual(['Layout.hideSideBar'])
})
