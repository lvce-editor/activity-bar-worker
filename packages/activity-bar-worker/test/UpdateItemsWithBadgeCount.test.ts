import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { updateItemsWithBadgeCount } from '../src/parts/UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

test('updateItemsWithBadgeCount updates badgeText with count', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return { item1: 5, item2: 0, item3: 10 }
    },
  })
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
  ]

  const result: readonly ActivityBarItem[] = await updateItemsWithBadgeCount(items)

  expect(result[0].badgeText).toBe('5')
  expect(result[1].badgeText).toBe('')
  expect(result[2].badgeText).toBe('10')
  expect(result[0].id).toBe('item1')
  expect(result[1].id).toBe('item2')
  expect(result[2].id).toBe('item3')
})

test('updateItemsWithBadgeCount sets empty badgeText for zero count', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return { item1: 0 }
    },
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }]

  const result: readonly ActivityBarItem[] = await updateItemsWithBadgeCount(items)

  expect(result[0].badgeText).toBe('')
})

test('updateItemsWithBadgeCount sets empty badgeText for missing count', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {}
    },
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }]

  const result: readonly ActivityBarItem[] = await updateItemsWithBadgeCount(items)

  expect(result[0].badgeText).toBe('')
})

test('updateItemsWithBadgeCount preserves other item properties', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return { item1: 3 }
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

  const result: readonly ActivityBarItem[] = await updateItemsWithBadgeCount(items)

  expect(result[0].badgeText).toBe('3')
  expect(result[0].flags).toBe(1)
  expect(result[0].icon).toBe('test-icon')
  expect(result[0].id).toBe('item1')
  expect(result[0].keyShortcuts).toBe('Ctrl+K')
  expect(result[0].title).toBe('Test Item')
  expect(result[0].badgeIcon).toBe('badge-icon')
})

test('updateItemsWithBadgeCount overwrites existing badgeText', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return { item1: 7 }
    },
  })
  const items: readonly ActivityBarItem[] = [
    {
      badgeText: 'old',
      flags: 0,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      title: 'Item 1',
    },
  ]

  const result: readonly ActivityBarItem[] = await updateItemsWithBadgeCount(items)

  expect(result[0].badgeText).toBe('7')
})

test('updateItemsWithBadgeCount handles empty items array', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {}
    },
  })
  const items: readonly ActivityBarItem[] = []

  const result: readonly ActivityBarItem[] = await updateItemsWithBadgeCount(items)

  expect(result).toEqual([])
  expect(result.length).toBe(0)
})

test('updateItemsWithBadgeCount returns original items on error', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      throw new Error('RPC error')
    },
  })
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }]

  const result: readonly ActivityBarItem[] = await updateItemsWithBadgeCount(items)

  expect(result).toBe(items)
  expect(result[0].badgeText).toBeUndefined()
})

test('updateItemsWithBadgeCount handles multiple items with various counts', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return { item1: 1, item2: 99, item3: 0, item4: 1000 }
    },
  })
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
  ]

  const result: readonly ActivityBarItem[] = await updateItemsWithBadgeCount(items)

  expect(result[0].badgeText).toBe('1')
  expect(result[1].badgeText).toBe('99')
  expect(result[2].badgeText).toBe('')
  expect(result[3].badgeText).toBe('1000')
})
