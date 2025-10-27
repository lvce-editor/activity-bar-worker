import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffFocus/DiffFocus.ts'

test('isEqual returns true when focused and focus are the same', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 1,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 1,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual returns true when both states are identical', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
    focus: 0,
  }

  const result: boolean = isEqual(state, state)

  expect(result).toBe(true)
})

test('isEqual returns false when focused differs', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
    focus: 0,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 0,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when focus differs', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 0,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 1,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when both focused and focus differ', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
    focus: 0,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 5,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns true when both are false and focus is same', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
    focus: 2,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
    focus: 2,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual returns true when both are true and focus is same', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 3,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 3,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual returns false when focused changes from true to false', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 1,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
    focus: 1,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when focused changes from false to true', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
    focus: 1,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
    focus: 1,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})
