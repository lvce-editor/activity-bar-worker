import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { applyRender } from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test.skip('applyRender returns empty commands array', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()
  const diffResult: readonly number[] = [1, 2, 3]

  const result = applyRender(oldState, newState, diffResult)

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(0)
})

test.skip('applyRender returns new array each time', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()
  const diffResult: readonly number[] = []

  const result1 = applyRender(oldState, newState, diffResult)
  const result2 = applyRender(oldState, newState, diffResult)

  expect(result1).not.toBe(result2)
  expect(result1).toEqual(result2)
})

test.skip('applyRender handles different states', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
  }
  const diffResult: readonly number[] = [1, 2, 3, 4, 5]

  const result = applyRender(oldState, newState, diffResult)

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(0)
})

test.skip('applyRender handles empty diffResult', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()
  const diffResult: readonly number[] = []

  const result = applyRender(oldState, newState, diffResult)

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(0)
})

test.skip('applyRender handles large diffResult', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()
  const diffResult: readonly number[] = Array.from({ length: 100 }, (_, i) => i)

  const result = applyRender(oldState, newState, diffResult)

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(0)
})
