import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getCustomIconSignature } from '../src/parts/GetCustomIconSignature/GetCustomIconSignature.ts'

test('getCustomIconSignature returns stable class and url signature', () => {
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
      id: 'test',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Test',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: 'MaskIconCustomViewdef',
      customIconUrl: 'file:///tmp/icon.png',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'file:///tmp/icon.png',
      id: 'test2',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Test 2',
    },
  ]

  expect(getCustomIconSignature(items)).toBe('MaskIconCustomViewabc\nhttps://example.com/icon.svg\nMaskIconCustomViewdef\nfile:///tmp/icon.png')
})

test('getCustomIconSignature skips incomplete custom icon metadata', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: 'MaskIconCustomViewabc',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'https://example.com/icon.svg',
      id: 'test',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Test',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: 'https://example.com/icon.svg',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'https://example.com/icon.svg',
      id: 'test2',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Test 2',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'Extensions',
      id: 'test3',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Test 3',
    },
  ]

  expect(getCustomIconSignature(items)).toBe('')
})
