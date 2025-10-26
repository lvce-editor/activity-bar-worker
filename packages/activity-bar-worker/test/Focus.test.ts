import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focus } from '../src/parts/Focus/Focus.ts'

test('focus sets focus to List when state.focus is falsy', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: 0,
  }

  const result: ActivityBarState = focus(state)

  expect(result.focus).toBe(1)
  expect(result).not.toBe(state)
})

test('focus returns same state when state.focus is truthy', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: 0,
  }

  const result: ActivityBarState = focus(state)

  expect(result).toBe(state)
})

test('focus preserves other state properties when setting focus', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: 0,
    focusedIndex: 2,
    focused: true,
    activityBarItems: ['item1', 'item2'],
  }

  const result: ActivityBarState = focus(state)

  expect(result.focus).toBe(1)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.focused).toBe(state.focused)
  expect(result.activityBarItems).toBe(state.activityBarItems)
})

test('focus handles null focus value', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: null as any,
  }

  const result: ActivityBarState = focus(state)

  expect(result.focus).toBe(1)
})

test('focus handles empty string focus value', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: 0,
  }

  const result: ActivityBarState = focus(state)

  expect(result.focus).toBe(1)
})
