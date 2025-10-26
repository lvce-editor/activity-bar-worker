import { expect, test } from '@jest/globals'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners returns array of event listeners', () => {
  const listeners = renderEventListeners()

  expect(Array.isArray(listeners)).toBe(true)
  expect(listeners.length).toBeGreaterThan(0)
})
