import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState returns SavedState with currentViewletId', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'explorer',
  }

  const result = saveState(state)

  expect(result).toEqual({ currentViewletId: 'explorer' })
})

test('saveState preserves currentViewletId from state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'search',
    focused: true,
    focusedIndex: 2,
  }

  const result = saveState(state)

  expect(result.currentViewletId).toBe('search')
  expect(result).toEqual({ currentViewletId: 'search' })
})

test('saveState returns new object', () => {
  const state: ActivityBarState = createDefaultState()
  const result = saveState(state)

  expect(result).not.toBe(state)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})
