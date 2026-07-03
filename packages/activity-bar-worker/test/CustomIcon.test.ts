import { expect, test } from '@jest/globals'
import * as CustomIcon from '../src/parts/CustomIcon/CustomIcon.ts'

test('getCustomIconClass is deterministic and selector safe', () => {
  const className = CustomIcon.getCustomIconClass('sample.views.png', 'https://example.com/icon.png')

  expect(className).toBe(CustomIcon.getCustomIconClass('sample.views.png', 'https://example.com/icon.png'))
  expect(className).toMatch(/^MaskIconCustomView[a-z0-9]+$/)
})

test('getCustomIconClass changes for different urls', () => {
  const className1 = CustomIcon.getCustomIconClass('sample.views.png', 'https://example.com/icon.png')
  const className2 = CustomIcon.getCustomIconClass('sample.views.png', 'https://example.com/other.png')

  expect(className1).not.toBe(className2)
})

test('isCustomIconUrl detects url-like icons', () => {
  expect(CustomIcon.isCustomIconUrl('https://example.com/icon.svg')).toBe(true)
  // eslint-disable-next-line unicorn/prefer-https
  expect(CustomIcon.isCustomIconUrl('http://example.com/icon.svg')).toBe(true)
  expect(CustomIcon.isCustomIconUrl('file:///tmp/icon.svg')).toBe(true)
  expect(CustomIcon.isCustomIconUrl('/icons/icon.svg')).toBe(true)
  expect(CustomIcon.isCustomIconUrl('Extensions')).toBe(false)
  expect(CustomIcon.isCustomIconUrl('symbol-beaker')).toBe(false)
})

test('escapeCssUrl escapes quotes and control characters', () => {
  const escaped = CustomIcon.escapeCssUrl('https://example.com/a"b\\c\nd.svg')

  expect(escaped).toBe('https://example.com/a\\"b\\\\c\\a d.svg')
})

test('getCustomIconCss skips duplicates', () => {
  const items = [
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

  const css = CustomIcon.getCustomIconCss(items)

  expect(css.match(/MaskIconCustomViewabc/g)?.length).toBe(1)
  expect(css).toContain('mask-image: url("https://example.com/icon.svg");')
})
