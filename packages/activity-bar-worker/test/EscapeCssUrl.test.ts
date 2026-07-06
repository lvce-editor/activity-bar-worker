import { expect, test } from '@jest/globals'
import { escapeCssUrl } from '../src/parts/EscapeCssUrl/EscapeCssUrl.ts'

test('escapeCssUrl escapes quotes and control characters', () => {
  const escaped = escapeCssUrl('https://example.com/a"b\\c\nd.svg')

  expect(escaped).toBe('https://example.com/a\\"b\\\\c\\a d.svg')
})
