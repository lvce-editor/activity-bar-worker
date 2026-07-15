import { expect, test } from '@jest/globals'
import { getCustomIconClass } from '../src/parts/GetCustomIconClass/GetCustomIconClass.ts'

const customIconClassRegex = /^MaskIconCustomView[a-z0-9]+$/

test('getCustomIconClass is deterministic and selector safe', () => {
  const className = getCustomIconClass('sample.views.png', 'https://example.com/icon.png')

  expect(className).toBe(getCustomIconClass('sample.views.png', 'https://example.com/icon.png'))
  expect(className).toMatch(customIconClassRegex)
})

test('getCustomIconClass changes for different urls', () => {
  const className1 = getCustomIconClass('sample.views.png', 'https://example.com/icon.png')
  const className2 = getCustomIconClass('sample.views.png', 'https://example.com/other.png')

  expect(className1).not.toBe(className2)
})
