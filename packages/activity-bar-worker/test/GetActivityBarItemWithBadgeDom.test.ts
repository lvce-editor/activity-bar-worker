import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActivityBarItemWithBadgeDom } from '../src/parts/GetActivityBarItemWithBadgeDom/GetActivityBarItemWithBadgeDom.ts'

test('getActivityBarItemWithBadgeDom returns empty array when badgeText is missing', () => {
  const item: ActivityBarItem = {
    flags: 0,
    icon: 'Explorer',
    title: 'Explorer',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result).toEqual([])
})

test('getActivityBarItemWithBadgeDom returns empty array when badgeText is empty string', () => {
  const item: ActivityBarItem = {
    badgeText: '',
    flags: 0,
    icon: 'Explorer',
    title: 'Explorer',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result).toEqual([])
})

test('getActivityBarItemWithBadgeDom creates correct DOM structure with badgeText', () => {
  const item: ActivityBarItem = {
    badgeText: '5',
    flags: 0,
    icon: 'Explorer',
    title: 'Explorer',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result.length).toBe(4)
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
    badgeText: '3',
    flags: ActivityBarItemFlags.Tab,
    icon: 'Settings',
    title: 'Settings',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].role).toBe(AriaRoles.Tab)
  expect(result[0].ariaSelected).toBe(false)
})

test('getActivityBarItemWithBadgeDom handles Selected flag', () => {
  const item: ActivityBarItem = {
    badgeText: '2',
    flags: ActivityBarItemFlags.Selected,
    icon: 'Explorer',
    title: 'Explorer',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
  expect(result[0].ariaSelected).toBe(undefined)
})

test('getActivityBarItemWithBadgeDom handles Tab and Selected flags together', () => {
  const item: ActivityBarItem = {
    badgeText: '10',
    flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
    icon: 'Search',
    title: 'Search',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].role).toBe(AriaRoles.Tab)
  expect(result[0].ariaSelected).toBe(true)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
})

test('getActivityBarItemWithBadgeDom handles Focused flag', () => {
  const item: ActivityBarItem = {
    badgeText: '1',
    flags: ActivityBarItemFlags.Focused,
    icon: 'Explorer',
    title: 'Explorer',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].className).toContain(ClassNames.FocusOutline)
})

test('getActivityBarItemWithBadgeDom handles MarginTop flag', () => {
  const item: ActivityBarItem = {
    badgeText: '7',
    flags: ActivityBarItemFlags.MarginTop,
    icon: 'Git',
    title: 'Git',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
})

test('getActivityBarItemWithBadgeDom handles multiple flags together', () => {
  const item: ActivityBarItem = {
    badgeText: '99',
    flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected | ActivityBarItemFlags.Focused | ActivityBarItemFlags.MarginTop,
    icon: 'Explorer',
    title: 'Explorer',
  } as any

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
    badgeText: '3',
    flags: 0,
    icon: 'Settings',
    title: 'Settings',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[1].className).toBe('Icon MaskIconSettings')
})

test('getActivityBarItemWithBadgeDom uses correct badgeText', () => {
  const item: ActivityBarItem = {
    badgeText: '42',
    flags: 0,
    icon: 'Explorer',
    title: 'Explorer',
  } as any

  const result = getActivityBarItemWithBadgeDom(item)

  expect(result[3]).toEqual(text('42'))
})
