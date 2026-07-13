import { expect, test } from '@jest/globals'
import { isCustomIconUrl } from '../src/parts/IsCustomIconUrl/IsCustomIconUrl.ts'

test('isCustomIconUrl detects url-like icons', () => {
  expect(isCustomIconUrl('https://example.com/icon.svg')).toBe(true)
  // eslint-disable-next-line unicorn/prefer-https
  expect(isCustomIconUrl('http://example.com/icon.svg')).toBe(true)
  expect(isCustomIconUrl('file:///tmp/icon.svg')).toBe(true)
  expect(isCustomIconUrl('lvce://-/remote/home/test/.local/share/lvce/extensions/example/icon.svg')).toBe(true)
  expect(isCustomIconUrl('/icons/icon.svg')).toBe(true)
  expect(isCustomIconUrl('Extensions')).toBe(false)
  expect(isCustomIconUrl('symbol-beaker')).toBe(false)
})
