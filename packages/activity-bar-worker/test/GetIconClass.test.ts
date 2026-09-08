import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getIconClass } from '../src/parts/GetIconClass/GetIconClass.ts'

test('getIconClass prefers custom icon class', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '',
    customIconClass: 'MaskIconCustomViewabc',
    customIconUrl: 'https://example.com/icon.svg',
    enabled: false,
    flags: 0,
    hasPopup: false,
    icon: 'https://example.com/icon.svg',
    id: 'test',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Test',
  }

  expect(getIconClass(item, 'MaskIcon')).toBe('MaskIconCustomViewabc')
})

test('getIconClass falls back to builtin prefix', () => {
  const item: ActivityBarItem = {
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 0,
    hasPopup: false,
    icon: 'Explorer',
    id: 'test',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Test',
  }

  expect(getIconClass(item, 'Icon')).toBe('IconExplorer')
})
