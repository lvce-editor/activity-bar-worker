import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getCustomIconSignature } from '../src/parts/GetCustomIconSignature/GetCustomIconSignature.ts'

test('getCustomIconSignature returns stable class and url signature', () => {
  const items: readonly ActivityBarItem[] = [
    {
      customIconClass: 'MaskIconCustomViewabc',
      customIconUrl: 'https://example.com/icon.svg',
      flags: 0,
      icon: 'https://example.com/icon.svg',
      id: 'test',
      keyShortcuts: '',
      title: 'Test',
    },
    {
      customIconClass: 'MaskIconCustomViewdef',
      customIconUrl: 'file:///tmp/icon.png',
      flags: 0,
      icon: 'file:///tmp/icon.png',
      id: 'test2',
      keyShortcuts: '',
      title: 'Test 2',
    },
  ]

  expect(getCustomIconSignature(items)).toBe('MaskIconCustomViewabc\nhttps://example.com/icon.svg\nMaskIconCustomViewdef\nfile:///tmp/icon.png')
})

test('getCustomIconSignature skips incomplete custom icon metadata', () => {
  const items: readonly ActivityBarItem[] = [
    {
      customIconClass: 'MaskIconCustomViewabc',
      flags: 0,
      icon: 'https://example.com/icon.svg',
      id: 'test',
      keyShortcuts: '',
      title: 'Test',
    },
    {
      customIconUrl: 'https://example.com/icon.svg',
      flags: 0,
      icon: 'https://example.com/icon.svg',
      id: 'test2',
      keyShortcuts: '',
      title: 'Test 2',
    },
    {
      flags: 0,
      icon: 'Extensions',
      id: 'test3',
      keyShortcuts: '',
      title: 'Test 3',
    },
  ]

  expect(getCustomIconSignature(items)).toBe('')
})
