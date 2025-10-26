import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleResize } from '../src/parts/HandleResize/HandleResize.ts'

test('handleResize returns the same state', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = handleResize(state)

  expect(result).toBe(state)
})

test('handleResize returns the same state for custom state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    width: 100,
    x: 20,
    y: 30,
  }
  const result: ActivityBarState = handleResize(state)

  expect(result).toBe(state)
  expect(result.width).toBe(100)
  expect(result.x).toBe(20)
  expect(result.y).toBe(30)
})

test('handleResize returns the same state reference', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = handleResize(state)

  expect(result).toBe(state)
})
