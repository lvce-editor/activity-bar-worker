import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'

test.skip('ContextMenu.show calls RendererWorker.showContextMenu with correct parameters', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })

  // @ts-ignore
  await ContextMenu.show(100, 200, MenuEntryId.ActivityBar)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 100, 200, MenuEntryId.ActivityBar, []]])
})

test.skip('ContextMenu.show calls showContextMenu with different menu entry IDs', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })

  // @ts-ignore
  await ContextMenu.show(50, 75, MenuEntryId.Settings)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 50, 75, MenuEntryId.Settings, []]])
})

test.skip('ContextMenu.show calls showContextMenu with additional args', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })

  // @ts-ignore
  await ContextMenu.show(0, 0, MenuEntryId.ActivityBar, 'arg1', 'arg2', 'arg3')

  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 0, 0, MenuEntryId.ActivityBar, ['arg1', 'arg2', 'arg3']]])
})

test.skip('ContextMenu.show handles different coordinates', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })

  // @ts-ignore
  await ContextMenu.show(500, 1000, MenuEntryId.ActivityBar)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 500, 1000, MenuEntryId.ActivityBar, []]])
})

test.skip('ContextMenu.show handles empty args', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })

  // @ts-ignore
  await ContextMenu.show(100, 200, MenuEntryId.ActivityBarAdditionalViews)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 100, 200, MenuEntryId.ActivityBarAdditionalViews, []]])
})

test.skip('ContextMenu.show can be called multiple times', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show'() {},
  })

  // @ts-ignore

  // @ts-ignoreawait ContextMenu.show(10, 20, MenuEntryId.ActivityBar)
  await ContextMenu.show(30, 40, MenuEntryId.Settings)

  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show', 10, 20, MenuEntryId.ActivityBar, []],
    ['ContextMenu.show', 30, 40, MenuEntryId.Settings, []],
  ])
})
