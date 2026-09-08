import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getVisibleActivityBarItems } from '../src/parts/GetVisibleActivityBarItems/GetVisibleActivityBarItems.ts'

const items: readonly ActivityBarItem[] = [
  {
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.Focused,
    hasPopup: false,
    icon: 'explorer',
    id: 'Explorer',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Explorer',
  },
  {
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 0,
    hasPopup: false,
    icon: 'search',
    id: 'Search',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Search',
  },
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
