import { expect, test } from '@jest/globals'
import { getKeyBindings } from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('getKeyBindings returns array of key bindings', () => {
  const keyBindings = getKeyBindings()

  expect(Array.isArray(keyBindings)).toBe(true)
  expect(keyBindings.length).toBeGreaterThan(0)
})
