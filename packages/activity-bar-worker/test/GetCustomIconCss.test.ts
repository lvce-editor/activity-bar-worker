import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getCustomIconCss } from '../src/parts/GetCustomIconCss/GetCustomIconCss.ts'

const customIconRegex = /MaskIconCustomViewabc/g

test('getCustomIconCss skips duplicates', () => {
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
      customIconClass: 'MaskIconCustomViewabc',
      customIconUrl: 'https://example.com/icon.svg',
      flags: 0,
      icon: 'https://example.com/icon.svg',
      id: 'test2',
      keyShortcuts: '',
      title: 'Test 2',
    },
  ]

  const css = getCustomIconCss(items)

  expect(css.match(customIconRegex)?.length).toBe(1)
  expect(css).toContain('mask-image: url("https://example.com/icon.svg");')
})
