import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState returns SavedState with uid', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: 123,
  }
  
  const result = saveState(state)
  
  expect(result).toEqual({ uid: 123 })
})

test('saveState preserves uid from state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: 456,
    focusedIndex: 2,
    focused: true,
    activityBarItems: ['item1', 'item2'],
  }
  
  const result = saveState(state)
  
  expect(result.uid).toBe(456)
  expect(result).toEqual({ uid: 456 })
})

test('saveState handles uid of 0', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: 0,
  }
  
  const result = saveState(state)
  
  expect(result).toEqual({ uid: 0 })
})

test('saveState handles negative uid', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: -1,
  }
  
  const result = saveState(state)
  
  expect(result).toEqual({ uid: -1 })
})

test('saveState returns new object', () => {
  const state: ActivityBarState = createDefaultState()
  const result = saveState(state)
  
  expect(result).not.toBe(state)
})
