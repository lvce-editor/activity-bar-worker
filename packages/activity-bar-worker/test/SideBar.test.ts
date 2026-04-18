import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { hide, show, toggle } from '../src/parts/SideBar/SideBar.ts'

test('show calls SideBar.show when sideBarVisible is true', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {},
  })
  await show(true, 'test-id')
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'test-id']])
})

test('show calls Layout.showSideBar when sideBarVisible is false', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {},
    'SideBar.show'() {},
  })
  await show(false, 'test-id')
  expect(mockRpc.invocations).toEqual([
    ['SideBar.show', 'test-id'],
    ['Layout.showSideBar', 'test-id'],
  ])
})

test('hide calls Layout.hideSideBar', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {},
  })
  await hide()
  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
})

test('toggle calls Layout.toggleSideBarView', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.toggleSideBarView'() {},
  })
  await toggle('test-id')
  expect(mockRpc.invocations).toEqual([['Layout.toggleSideBarView', 'test-id']])
})
