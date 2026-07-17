import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectCurrent } from '../src/parts/SelectCurrent/SelectCurrent.ts'

const items: readonly ActivityBarItem[] = [
  { flags: 0, icon: 'explorer', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
  { flags: 0, icon: 'account', id: 'Account', keyShortcuts: '', title: 'Account' },
  { flags: 0, icon: 'settings', id: 'Settings', keyShortcuts: '', title: 'Settings' },
]

test('selectCurrent activates the focused settings item at its visual position', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
    focusedIndex: 2,
    height: 400,
    itemHeight: 48,
    width: 48,
    x: 10,
    y: 20,
  }

  const result = await selectCurrent(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 0, MenuEntryId.Settings, 34, 396, { menuId: MenuEntryId.Settings }]])
})

test('selectCurrent ignores an invalid focused index', async () => {
  const state: ActivityBarState = { ...createDefaultState(), filteredItems: items, focusedIndex: -1 }

  expect(await selectCurrent(state)).toBe(state)
})
