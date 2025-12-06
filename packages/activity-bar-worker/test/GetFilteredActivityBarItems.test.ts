import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ViewletActivityBarStrings from '../src/parts/ActivityBarStrings/ActivityBarStrings.ts'
import { getFilteredActivityBarItems } from '../src/parts/GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import * as Icon from '../src/parts/Icon/Icon.ts'

test('getFilteredActivityBarItems returns all items when they all fit', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
  ]
  const height = 300
  const itemHeight = 50

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result).toBe(items)
  expect(result.length).toBe(3)
})

test('getFilteredActivityBarItems filters items when they do not all fit', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
    { flags: 0, icon: 'icon5', id: 'item5', keyShortcuts: '', title: 'Item 5' },
  ]
  const height = 150
  const itemHeight = 50
  const numberOfVisibleItems = Math.floor(height / itemHeight)

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result.length).toBe(numberOfVisibleItems)
  expect(result[0].id).toBe('item1')
  expect(result[numberOfVisibleItems - 2].id).toBe('Additional Views')
  expect(result[numberOfVisibleItems - 1].id).toBe('item5')
})

test('getFilteredActivityBarItems creates show more item with correct properties', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
  ]
  const height = 100
  const itemHeight = 50

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  const showMoreItem = result.find((item) => item.id === 'Additional Views')
  expect(showMoreItem).toBeDefined()
  expect(showMoreItem?.flags).toBe(ActivityBarItemFlags.Button)
  expect(showMoreItem?.icon).toBe(Icon.Ellipsis)
  expect(showMoreItem?.keyShortcuts).toBe('')
  expect(showMoreItem?.title).toBe(ViewletActivityBarStrings.additionalViews())
})

test('getFilteredActivityBarItems handles empty items array', () => {
  const items: readonly ActivityBarItem[] = []
  const height = 300
  const itemHeight = 50

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result).toBe(items)
  expect(result.length).toBe(0)
})

test('getFilteredActivityBarItems handles single item that fits', () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }]
  const height = 100
  const itemHeight = 50

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result).toBe(items)
  expect(result.length).toBe(1)
  expect(result[0].id).toBe('item1')
})

test('getFilteredActivityBarItems handles single item that does not fit', () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }]
  const height = 30
  const itemHeight = 50

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result.length).toBe(2)
  expect(result[0].id).toBe('Additional Views')
  expect(result[1].id).toBe('item1')
})

test('getFilteredActivityBarItems handles exactly numberOfVisibleItems items', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
  ]
  const height = 150
  const itemHeight = 50

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result).toBe(items)
  expect(result.length).toBe(3)
})

test('getFilteredActivityBarItems handles numberOfVisibleItems + 1 items', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
  ]
  const height = 150
  const itemHeight = 50
  const numberOfVisibleItems = Math.floor(height / itemHeight)

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result.length).toBe(numberOfVisibleItems)
  expect(result[numberOfVisibleItems - 2].id).toBe('Additional Views')
  expect(result[numberOfVisibleItems - 1].id).toBe('item4')
})

test('getFilteredActivityBarItems preserves item properties', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: 'badge-icon',
      badgeText: '5',
      flags: 1,
      icon: 'test-icon',
      id: 'item1',
      keyShortcuts: 'Ctrl+K',
      title: 'Test Item',
    },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
  ]
  const height = 200
  const itemHeight = 50

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result[0].flags).toBe(1)
  expect(result[0].icon).toBe('test-icon')
  expect(result[0].id).toBe('item1')
  expect(result[0].keyShortcuts).toBe('Ctrl+K')
  expect(result[0].title).toBe('Test Item')
  expect(result[0].badgeIcon).toBe('badge-icon')
  expect(result[0].badgeText).toBe('5')
})

test('getFilteredActivityBarItems handles many items', () => {
  const items: readonly ActivityBarItem[] = Array.from({ length: 20 }, (_, i) => ({
    flags: 0,
    icon: `icon${i}`,
    id: `item${i}`,
    keyShortcuts: '',
    title: `Item ${i}`,
  }))
  const height = 200
  const itemHeight = 50
  const numberOfVisibleItems = Math.floor(height / itemHeight)

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result.length).toBe(numberOfVisibleItems)
  expect(result[0].id).toBe('item0')
  expect(result[numberOfVisibleItems - 2].id).toBe('Additional Views')
  expect(result[numberOfVisibleItems - 1].id).toBe('item19')
})

test('getFilteredActivityBarItems handles fractional height calculations', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
  ]
  const height = 120
  const itemHeight = 50
  const numberOfVisibleItems = Math.floor(height / itemHeight)

  const result: readonly ActivityBarItem[] = getFilteredActivityBarItems(items, height, itemHeight)

  expect(result.length).toBe(numberOfVisibleItems)
  expect(result[numberOfVisibleItems - 2].id).toBe('Additional Views')
  expect(result[numberOfVisibleItems - 1].id).toBe('item4')
})
