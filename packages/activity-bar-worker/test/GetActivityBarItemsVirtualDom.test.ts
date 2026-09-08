import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetActivityBarItemsVirtualDom from '../src/parts/GetActivityBarItemsVirtualDom/GetActivityBarItemsVirtualDom.ts'

test('getVirtualDom returns empty array for empty items', () => {
  const result = GetActivityBarItemsVirtualDom.getVirtualDom([])

  expect(result).toEqual([])
})

test('getVirtualDom creates basic item without flags', () => {
  const items: readonly ActivityBarItem[] = [
    {
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
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(1)
  expect(result[0].type).toBe(VirtualDomElements.Div)
  expect(result[0].className).toBe('ActivityBarItem IconExplorer')
  expect(result[0].role).toBe(AriaRoles.Button)
  expect(result[0].childCount).toBe(0)
})

test('getVirtualDom applies custom icon class to basic item', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: 'MaskIconCustomViewabc',
      customIconUrl: 'https://example.com/icon.svg',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'https://example.com/icon.svg',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Custom Icon',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(1)
  expect(result[0].className).toBe('ActivityBarItem MaskIconCustomViewabc')
})

test('getVirtualDom creates item with Tab flag', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Tab,
      hasPopup: false,
      icon: 'Explorer',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(1)
  expect(result[0].role).toBe(AriaRoles.Tab)
})

test('getVirtualDom creates selected item with icon', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
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
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(2)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
  expect(result[0].childCount).toBe(1)
  expect(result[1].className).toBe('MaskIcon MaskIconExplorer')
})

test('getVirtualDom applies custom icon class to selected item child', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: 'MaskIconCustomViewabc',
      customIconUrl: 'https://example.com/icon.svg',
      enabled: false,
      flags: ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'https://example.com/icon.svg',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Custom Icon',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(2)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
  expect(result[0].className).not.toContain('MaskIconCustomViewabc')
  expect(result[1].className).toBe('MaskIcon MaskIconCustomViewabc')
})

test('getVirtualDom creates selected tab with icon', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'Explorer',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(2)
  expect(result[0].role).toBe(AriaRoles.Tab)
  expect(result[0].ariaSelected).toBe(true)
})

test('getVirtualDom preserves badge on selected item', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '1',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'SourceControl',
      id: 'Source Control',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Source Control',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(4)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
  expect(result[0].ariaSelected).toBe(true)
  expect(result[2].className).toBe(ClassNames.ActivityBarItemBadge)
})

test('getVirtualDom creates item with Focused flag', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
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
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.FocusOutline)
})

test('getVirtualDom creates item with MarginTop flag', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.MarginTop,
      hasPopup: false,
      icon: 'Explorer',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
})

test('getVirtualDom creates item with Progress flag', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Progress,
      hasPopup: false,
      icon: 'Explorer',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(5)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemNested)
  expect(result[0].childCount).toBe(2)
})

test('getVirtualDom creates item with multiple flags', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Focused | ActivityBarItemFlags.MarginTop | ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'Explorer',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.FocusOutline)
  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
})

test('getVirtualDom creates multiple items', () => {
  const items: readonly ActivityBarItem[] = [
    {
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
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'Settings',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Settings',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result).toHaveLength(3)
})

test('getVirtualDom handles item with all flags', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags:
        ActivityBarItemFlags.Tab |
        ActivityBarItemFlags.Progress |
        ActivityBarItemFlags.Selected |
        ActivityBarItemFlags.Focused |
        ActivityBarItemFlags.MarginTop,
      hasPopup: false,
      icon: 'Explorer',
      id: '',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBeGreaterThan(0)
})

test.each(['Account', 'Settings', 'CustomPopup'])('getVirtualDom adds ariaHasPopup for %s with hasPopup enabled', (id) => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: true,
      icon: 'Account',
      id,
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Account',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].ariaHasPopup).toBe(true)
})

test.each(['Explorer', 'Account', 'Settings'])('getVirtualDom does not infer ariaHasPopup from the %s id', (id) => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'Explorer',
      id,
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].ariaHasPopup).toBeUndefined()
})
