import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getActivityBarItemVirtualDom } from '../src/parts/GetActivityBarItemVirtualDom/GetActivityBarItemVirtualDom.ts'
import { getActivityBarItemWithBadgeDom } from '../src/parts/GetActivityBarItemWithBadgeDom/GetActivityBarItemWithBadgeDom.ts'

test('getActivityBarItemVirtualDom uses badge dom when badgeText is present', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '3',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 0,
    hasPopup: false,
    icon: 'Explorer',
    id: '',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Explorer',
  }

  const result = getActivityBarItemVirtualDom(item)

  expect(result).toEqual(getActivityBarItemWithBadgeDom(item))
})

test('getActivityBarItemVirtualDom adds item id as name', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 0,
    hasPopup: false,
    icon: 'SettingsGear',
    id: 'Settings',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Settings',
  }

  const result = getActivityBarItemVirtualDom(item)

  expect(result[0]).toMatchObject({
    name: 'Settings',
    title: 'Settings',
  })
})
