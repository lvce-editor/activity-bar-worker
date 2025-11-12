import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusId from '../src/parts/FocusId/FocusId.ts'
import { renderFocusContext } from '../src/parts/RenderFocusContext/RenderFocusContext.ts'

test('renderFocusContext returns focus context when focus is List', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focus: FocusId.List,
    uid: 123,
  }

  const result: readonly any[] = renderFocusContext(oldState, newState)

  expect(result.length).toBe(3)
  expect(result[1]).toBe(123)
})

test('renderFocusContext returns empty array when focus is not List', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focus: 0,
    uid: 123,
  }

  const result: readonly any[] = renderFocusContext(oldState, newState)

  expect(result.length).toBe(0)
})

test('renderFocusContext returns empty array when focus is 2', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focus: 2,
    uid: 456,
  }

  const result: readonly any[] = renderFocusContext(oldState, newState)

  expect(result.length).toBe(0)
})

test('renderFocusContext returns empty array when focus is negative', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focus: -1,
    uid: 789,
  }

  const result: readonly any[] = renderFocusContext(oldState, newState)

  expect(result.length).toBe(0)
})

