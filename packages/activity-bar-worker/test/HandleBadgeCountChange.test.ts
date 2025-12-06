import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleBadgeCountChange } from '../src/parts/handleBadgeCountChange/handleBadgeCountChange.ts'

test('handleBadgeCountChange updates filteredItems with badge counts', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 5,
        item2: 0,
        item3: 12,
      }
    },
  })

  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
  }

  const result: ActivityBarState = await handleBadgeCountChange(state)

  expect(mockRpc.invocations).toEqual([['Layout.getBadgeCounts']])
  expect(result.filteredItems.length).toBe(3)
  expect(result.filteredItems[0].badgeText).toBe('5')
  expect(result.filteredItems[1].badgeText).toBe('')
  expect(result.filteredItems[2].badgeText).toBe('12')
  expect(result.filteredItems[0].id).toBe('item1')
  expect(result.filteredItems[1].id).toBe('item2')
  expect(result.filteredItems[2].id).toBe('item3')
  expect(result).not.toBe(state)
})

test('handleBadgeCountChange preserves other state properties', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 3,
      }
    },
  })

  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
    focus: 1,
    focused: true,
    focusedIndex: 2,
    selectedIndex: 0,
    uid: 123,
  }

  const result: ActivityBarState = await handleBadgeCountChange(state)

  expect(result.focus).toBe(state.focus)
  expect(result.focused).toBe(state.focused)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.selectedIndex).toBe(state.selectedIndex)
  expect(result.uid).toBe(state.uid)
  expect(result.filteredItems[0].badgeText).toBe('3')
})

test('handleBadgeCountChange handles empty filteredItems', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {}
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [],
  }

  const result: ActivityBarState = await handleBadgeCountChange(state)

  expect(mockRpc.invocations).toEqual([['Layout.getBadgeCounts']])
  expect(result.filteredItems.length).toBe(0)
  expect(result).not.toBe(state)
})

test('handleBadgeCountChange handles items with no badge counts', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {}
    },
  })

  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
  }

  const result: ActivityBarState = await handleBadgeCountChange(state)

  expect(result.filteredItems.length).toBe(2)
  expect(result.filteredItems[0].badgeText).toBe('')
  expect(result.filteredItems[1].badgeText).toBe('')
})

test('handleBadgeCountChange handles items with existing badgeText', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 7,
        item2: 0,
      }
    },
  })

  const items: readonly ActivityBarItem[] = [
    { badgeText: 'old', flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { badgeText: 'old2', flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
  }

  const result: ActivityBarState = await handleBadgeCountChange(state)

  expect(result.filteredItems[0].badgeText).toBe('7')
  expect(result.filteredItems[1].badgeText).toBe('')
})

test('handleBadgeCountChange handles RPC error gracefully', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      throw new Error('RPC error')
    },
  })

  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
  }

  const result: ActivityBarState = await handleBadgeCountChange(state)

  expect(result.filteredItems).toBe(items)
  expect(result.filteredItems.length).toBe(2)
})

test('handleBadgeCountChange handles large badge counts', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 999,
        item2: 1000,
      }
    },
  })

  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
  }

  const result: ActivityBarState = await handleBadgeCountChange(state)

  expect(result.filteredItems[0].badgeText).toBe('999')
  expect(result.filteredItems[1].badgeText).toBe('1000')
})

test('handleBadgeCountChange preserves item properties other than badgeText', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 5,
      }
    },
  })

  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: 'badge-icon',
      flags: 1,
      icon: 'test-icon',
      id: 'item1',
      keyShortcuts: 'Ctrl+K',
      title: 'Test Item',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
  }

  const result: ActivityBarState = await handleBadgeCountChange(state)

  expect(result.filteredItems[0].flags).toBe(1)
  expect(result.filteredItems[0].icon).toBe('test-icon')
  expect(result.filteredItems[0].id).toBe('item1')
  expect(result.filteredItems[0].keyShortcuts).toBe('Ctrl+K')
  expect(result.filteredItems[0].title).toBe('Test Item')
  expect(result.filteredItems[0].badgeIcon).toBe('badge-icon')
  expect(result.filteredItems[0].badgeText).toBe('5')
})
