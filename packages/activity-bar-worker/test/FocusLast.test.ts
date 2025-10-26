import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusLast } from '../src/parts/FocusLast/FocusLast.ts'

test('focusLast calls focusIndex with -1', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = focusLast(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('focusLast preserves other state properties', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 2,
    focused: false,
    activityBarItems: ['item1', 'item2'],
    currentViewletId: 'test-viewlet',
  }

  const result: ActivityBarState = focusLast(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.focused).toBe(true)
  expect(result.activityBarItems).toBe(state.activityBarItems)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})

test('focusLast returns new state object', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = focusLast(state)

  expect(result).not.toBe(state)
})
