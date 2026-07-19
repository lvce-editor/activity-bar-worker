import { expect, test } from '@jest/globals'
import { getBadgeText } from '../src/parts/GetBadgeText/GetBadgeText.ts'

test.each([
  [0, ''],
  [1, '1'],
  [999, '999'],
  [1000, '1K'],
  [1001, '1K+'],
  [2518, '2K+'],
  [3000, '3K'],
])('formats %i as %s', (badgeCount, expected) => {
  expect(getBadgeText(badgeCount)).toBe(expected)
})
