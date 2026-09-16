import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { reorderActivityBarItems } from '../src/parts/ReorderActivityBarItems/ReorderActivityBarItems.ts'

const item = (id: string, flags = ActivityBarItemFlags.Tab): ActivityBarItem => ({ flags, id }) as ActivityBarItem

test('reorders an item before another item', () => {
  const items = [item('Explorer'), item('Search'), item('SourceControl')]

  expect(reorderActivityBarItems(items, 'SourceControl', 'Explorer', 'before').map((entry) => entry.id)).toEqual([
    'SourceControl',
    'Explorer',
    'Search',
  ])
})

test('reorders an item after another item', () => {
  const items = [item('Explorer'), item('Search'), item('SourceControl')]

  expect(reorderActivityBarItems(items, 'Explorer', 'SourceControl', 'after').map((entry) => entry.id)).toEqual([
    'Search',
    'SourceControl',
    'Explorer',
  ])
})

test('does not reorder bottom or synthetic items', () => {
  const items = [item('Explorer'), item('Additional Views'), item('Settings', ActivityBarItemFlags.Button)]

  expect(reorderActivityBarItems(items, 'Explorer', 'Additional Views', 'after')).toBe(items)
  expect(reorderActivityBarItems(items, 'Settings', 'Explorer', 'before')).toBe(items)
})
