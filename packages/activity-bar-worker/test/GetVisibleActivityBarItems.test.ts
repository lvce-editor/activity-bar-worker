import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getVisibleActivityBarItems } from '../src/parts/GetVisibleActivityBarItems/GetVisibleActivityBarItems.ts'

const items: readonly ActivityBarItem[] = [
  { flags: ActivityBarItemFlags.Focused, icon: 'explorer', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
  { flags: 0, icon: 'search', id: 'Search', keyShortcuts: '', title: 'Search' },
]

test('getVisibleActivityBarItems marks only the focused item', () => {
  const result = getVisibleActivityBarItems(items, 1)

  expect(result[0].flags & ActivityBarItemFlags.Focused).toBe(0)
  expect(result[1].flags & ActivityBarItemFlags.Focused).toBe(ActivityBarItemFlags.Focused)
})

test('getVisibleActivityBarItems clears focus when no item is focused', () => {
  const result = getVisibleActivityBarItems(items, -1)

  expect(result.every((item) => !(item.flags & ActivityBarItemFlags.Focused))).toBe(true)
})
