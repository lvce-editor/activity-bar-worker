import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getIconClass } from '../src/parts/GetIconClass/GetIconClass.ts'

test('getIconClass prefers custom icon class', () => {
  const item: ActivityBarItem = {
    customIconClass: 'MaskIconCustomViewabc',
    customIconUrl: 'https://example.com/icon.svg',
    flags: 0,
    icon: 'https://example.com/icon.svg',
    id: 'test',
    keyShortcuts: '',
    title: 'Test',
  }

  expect(getIconClass(item, 'MaskIcon')).toBe('MaskIconCustomViewabc')
})

test('getIconClass falls back to builtin prefix', () => {
  const item: ActivityBarItem = {
    flags: 0,
    icon: 'Explorer',
    id: 'test',
    keyShortcuts: '',
    title: 'Test',
  }

  expect(getIconClass(item, 'Icon')).toBe('IconExplorer')
})
