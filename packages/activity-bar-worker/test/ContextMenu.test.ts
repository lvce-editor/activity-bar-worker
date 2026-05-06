import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'

test('ContextMenu.show2 calls RendererWorker.showContextMenu2 with correct parameters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  await ContextMenu.show2(1, MenuEntryId.ActivityBar, 100, 200, {
    menuId: MenuEntryId.ActivityBar,
  })

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 1, MenuEntryId.ActivityBar, 100, 200, { menuId: MenuEntryId.ActivityBar }]])
})

test('ContextMenu.show2 forwards other menu entry ids', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  await ContextMenu.show2(0, MenuEntryId.Settings, 50, 75, {
    menuId: MenuEntryId.Settings,
  })

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 50, 75, { menuId: MenuEntryId.Settings }]])
})

test('ContextMenu.show2 forwards context menu props', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  await ContextMenu.show2(5, MenuEntryId.ActivityBarAdditionalViews, 0, 0, {
    menuId: MenuEntryId.ActivityBarAdditionalViews,
    viewletId: 'Extensions',
  })

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      5,
      MenuEntryId.ActivityBarAdditionalViews,
      0,
      0,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Extensions' },
    ],
  ])
})

test('ContextMenu.show2 handles different coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  await ContextMenu.show2(3, MenuEntryId.ActivityBar, 500, 1000, {
    menuId: MenuEntryId.ActivityBar,
  })

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 3, MenuEntryId.ActivityBar, 500, 1000, { menuId: MenuEntryId.ActivityBar }]])
})

test('ContextMenu.show2 supports additional views menus', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  await ContextMenu.show2(8, MenuEntryId.ActivityBarAdditionalViews, 100, 200, {
    menuId: MenuEntryId.ActivityBarAdditionalViews,
    viewletId: 'Search',
  })

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      8,
      MenuEntryId.ActivityBarAdditionalViews,
      100,
      200,
      { menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: 'Search' },
    ],
  ])
})

test('ContextMenu.show2 can be called multiple times', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  await ContextMenu.show2(2, MenuEntryId.ActivityBar, 10, 20, {
    menuId: MenuEntryId.ActivityBar,
  })
  await ContextMenu.show2(2, MenuEntryId.Settings, 30, 40, {
    menuId: MenuEntryId.Settings,
  })

  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show2', 2, MenuEntryId.ActivityBar, 10, 20, { menuId: MenuEntryId.ActivityBar }],
    ['ContextMenu.show2', 2, MenuEntryId.Settings, 30, 40, { menuId: MenuEntryId.Settings }],
  ])
})
