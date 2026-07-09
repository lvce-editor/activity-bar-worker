import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getActivityBarItemVirtualDom } from '../src/parts/GetActivityBarItemVirtualDom/GetActivityBarItemVirtualDom.ts'
import { getActivityBarItemWithBadgeDom } from '../src/parts/GetActivityBarItemWithBadgeDom/GetActivityBarItemWithBadgeDom.ts'

test('getActivityBarItemVirtualDom uses badge dom when badgeText is present', () => {
  const item: ActivityBarItem = {
    badgeText: '3',
    flags: 0,
    icon: 'Explorer',
    title: 'Explorer',
  } as any

  const result = getActivityBarItemVirtualDom(item)

  expect(result).toEqual(getActivityBarItemWithBadgeDom(item))
})

test('getActivityBarItemVirtualDom adds item id as name', () => {
  const item: ActivityBarItem = {
    flags: 0,
    icon: 'SettingsGear',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }

  const result = getActivityBarItemVirtualDom(item)

  expect(result[0]).toMatchObject({
    name: 'Settings',
    title: 'Settings',
  })
})
