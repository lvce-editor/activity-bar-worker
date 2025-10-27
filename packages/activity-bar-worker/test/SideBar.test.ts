import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { hide, show } from '../src/parts/SideBar/SideBar.ts'

test('show calls SideBar.show when sideBarVisible is true', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show'() {},
  })
  await show(true, 'test-id')
  expect(mockRpc.invocations).toEqual(['SideBar.show', 'test-id'])
})

test('show calls Layout.showSideBar when sideBarVisible is false', async () => {
  let calledMethod: string | undefined
  let calledArgs: any[] | undefined

  const commandMap: Record<string, any> = {}
  const mockRpc = RendererWorker.registerMockRpc(commandMap)
  mockRpc.invoke = async (method: string, ...args: any[]): Promise<void> => {
    calledMethod = method
    calledArgs = args
  }
  RendererWorker.set(mockRpc)

  await show(false, 'test-id')

  expect(calledMethod).toBe('Layout.showSideBar')
  expect(calledArgs).toEqual(['test-id'])
})

test('hide calls Layout.hideSideBar', async () => {
  let calledMethod: string | undefined
  let calledArgs: any[] | undefined

  const commandMap: Record<string, any> = {}
  const mockRpc = RendererWorker.registerMockRpc(commandMap)
  mockRpc.invoke = async (method: string, ...args: any[]): Promise<void> => {
    calledMethod = method
    calledArgs = args
  }
  RendererWorker.set(mockRpc)

  await hide()

  expect(calledMethod).toBe('Layout.hideSideBar')
  expect(calledArgs).toEqual([])
})
