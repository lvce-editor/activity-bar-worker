import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getCustomIconCss } from '../src/parts/GetCustomIconCss/GetCustomIconCss.ts'

const customIconRegex = /MaskIconCustomViewabc/g

test('getCustomIconCss skips duplicates', () => {
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
      customIconClass: 'MaskIconCustomViewabc',
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
  ]

  const css = getCustomIconCss(items)

  expect(css.match(customIconRegex)?.length).toBe(1)
  expect(css).toContain('mask-image: url("https://example.com/icon.svg");')
})

test('getCustomIconCss preserves builtin asset paths', () => {
  const iconPath = '/assets/extensions/builtin.theme-slime/media/icon.svg'
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: 'MaskIconCustomViewbuiltin',
      customIconUrl: iconPath,
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: iconPath,
      id: 'builtin.view',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Builtin view',
    },
  ]

  expect(getCustomIconCss(items)).toContain(`mask-image: url("${iconPath}");`)
})
