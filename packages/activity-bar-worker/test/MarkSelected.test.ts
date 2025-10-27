import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { markSelected } from '../src/parts/MarkSelected/MarkSelected.ts'

test('markSelected marks item at index 0 as selected', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
    { id: 'item3', title: 'Item 3', icon: 'icon3', flags: 0, keyShortcuts: '' },
  ]

  const result: readonly ActivityBarItem[] = markSelected(items, 0)

  expect(result[0].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result[1].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result[2].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('markSelected marks item at index 1 as selected', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
    { id: 'item3', title: 'Item 3', icon: 'icon3', flags: 0, keyShortcuts: '' },
  ]

  const result: readonly ActivityBarItem[] = markSelected(items, 1)

  expect(result[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result[1].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result[2].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('markSelected marks item at last index as selected', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
    { id: 'item3', title: 'Item 3', icon: 'icon3', flags: 0, keyShortcuts: '' },
  ]

  const result: readonly ActivityBarItem[] = markSelected(items, 2)

  expect(result[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result[1].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result[2].flags & ActivityBarItemFlags.Selected).toBeTruthy()
})

test('markSelected does not mark any item when selectedIndex is -1', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]

  const result: readonly ActivityBarItem[] = markSelected(items, -1)

  expect(result[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result[1].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('markSelected preserves other flags on items', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: ActivityBarItemFlags.Tab, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: ActivityBarItemFlags.Focused, keyShortcuts: '' },
  ]

  const result: readonly ActivityBarItem[] = markSelected(items, 0)

  expect(result[0].flags & ActivityBarItemFlags.Tab).toBeTruthy()
  expect(result[0].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result[1].flags & ActivityBarItemFlags.Focused).toBeTruthy()
  expect(result[1].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('markSelected handles empty array', () => {
  const items: readonly ActivityBarItem[] = []

  const result: readonly ActivityBarItem[] = markSelected(items, 0)

  expect(result.length).toBe(0)
})

test('markSelected handles single item array', () => {
  const items: readonly ActivityBarItem[] = [{ id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' }]

  const result: readonly ActivityBarItem[] = markSelected(items, 0)

  expect(result[0].flags & ActivityBarItemFlags.Selected).toBeTruthy()
})

test('markSelected returns new array', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]

  const result: readonly ActivityBarItem[] = markSelected(items, 0)

  expect(result).not.toBe(items)
})

test('markSelected unm selects previously selected item', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: ActivityBarItemFlags.Selected, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]

  const result: readonly ActivityBarItem[] = markSelected(items, 1)

  expect(result[0].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result[1].flags & ActivityBarItemFlags.Selected).toBeTruthy()
})
