import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActivityBarItemWithBadgeDom } from '../src/parts/GetActivityBarItemWithBadgeDom/GetActivityBarItemWithBadgeDom.ts'

test('getActivityBarItemWithBadgeDom returns empty array when badgeText is missing', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '',
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

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result).toEqual([])
})

test('getActivityBarItemWithBadgeDom returns empty array when badgeText is empty string', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '',
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

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result).toEqual([])
})

test('getActivityBarItemWithBadgeDom creates correct DOM structure with badgeText', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '5',
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

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result).toHaveLength(4)
  expect(result[0].type).toBe(VirtualDomElements.Div)
  expect(result[0].role).toBe(AriaRoles.Button)
  expect(result[0].childCount).toBe(2)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemNested)
  expect(result[0].title).toBe('Explorer')
  expect(result[1].className).toBe('Icon MaskIconExplorer')
  expect(result[2].className).toBe(ClassNames.ActivityBarItemBadge)
  expect(result[2].childCount).toBe(1)
  expect(result[3]).toEqual(text('5'))
})

test('getActivityBarItemWithBadgeDom handles Tab flag', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '3',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.Tab,
    hasPopup: false,
    icon: 'Settings',
    id: '',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Settings',
  }

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].role).toBe(AriaRoles.Tab)
  expect(result[0].ariaSelected).toBe(false)
})

test('getActivityBarItemWithBadgeDom handles Selected flag', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '2',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.Selected,
    hasPopup: false,
    icon: 'Explorer',
    id: '',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Explorer',
  }

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
  expect(result[0].ariaSelected).toBe(undefined)
})

test('getActivityBarItemWithBadgeDom handles Tab and Selected flags together', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '10',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
    hasPopup: false,
    icon: 'Search',
    id: '',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Search',
  }

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].role).toBe(AriaRoles.Tab)
  expect(result[0].ariaSelected).toBe(true)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
})

test('getActivityBarItemWithBadgeDom handles Focused flag', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '1',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.Focused,
    hasPopup: false,
    icon: 'Explorer',
    id: '',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Explorer',
  }

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].className).toContain(ClassNames.FocusOutline)
})

test('getActivityBarItemWithBadgeDom handles MarginTop flag', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '7',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.MarginTop,
    hasPopup: false,
    icon: 'Git',
    id: '',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Git',
  }

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
})

test('getActivityBarItemWithBadgeDom handles multiple flags together', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '99',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected | ActivityBarItemFlags.Focused | ActivityBarItemFlags.MarginTop,
    hasPopup: false,
    icon: 'Explorer',
    id: '',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Explorer',
  }

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].role).toBe(AriaRoles.Tab)
  expect(result[0].ariaSelected).toBe(true)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
  expect(result[0].className).toContain(ClassNames.FocusOutline)
  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemNested)
})

test('getActivityBarItemWithBadgeDom uses correct icon in className', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '3',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 0,
    hasPopup: false,
    icon: 'Settings',
    id: '',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Settings',
  }

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[1].className).toBe('Icon MaskIconSettings')
})

test('getActivityBarItemWithBadgeDom uses correct badgeText', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '42',
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

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[3]).toEqual(text('42'))
})

test('getActivityBarItemWithBadgeDom adds ariaHasPopup for settings item', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '1',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 0,
    hasPopup: true,
    icon: 'SettingsGear',
    id: 'Settings',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Settings',
  }

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].ariaHasPopup).toBe(true)
})
