import { expect, test } from '@jest/globals'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'

test('diff2 returns RenderCss when oldState and newState are identical', () => {
  const uid = 1
  const state = createDefaultState()
  ActivityBarStates.set(uid, state, state)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([11])
})

test('diff2 returns RenderItems when activityBarItems differ', () => {
  const uid = 2
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'test', title: 'Test', icon: 'icon', flags: 0, keyShortcuts: '' }],
  }
  ActivityBarStates.set(uid, oldState, newState)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([4, 11])
})

test('diff2 returns RenderFocus when focused differs', () => {
  const uid = 3
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    focused: true,
  }
  ActivityBarStates.set(uid, oldState, newState)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([4, 6, 7, 11])
})

test('diff2 returns RenderFocusContext when focused changes', () => {
  const uid = 4
  const oldState = {
    ...createDefaultState(),
    focused: false,
  }
  const newState = {
    ...createDefaultState(),
    focused: true,
  }
  ActivityBarStates.set(uid, oldState, newState)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([4, 6, 7, 11])
})

test('diff2 returns RenderCss when width differs', () => {
  const uid = 5
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    width: 100,
  }
  ActivityBarStates.set(uid, oldState, newState)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([4, 11])
})

test('diff2 returns multiple render types when multiple fields differ', () => {
  const uid = 6
  const oldState = createDefaultState()
  const newState: typeof oldState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'test', title: 'Test', icon: 'icon', flags: 0, keyShortcuts: '' }],
    focused: true,
    width: 100,
  }
  ActivityBarStates.set(uid, oldState, newState)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([4, 6, 7, 11])
})

test('diff2 returns appropriate types when only focus differs', () => {
  const uid = 7
  const oldState = {
    ...createDefaultState(),
    focused: false,
    focus: 0,
  }
  const newState = {
    ...createDefaultState(),
    focused: false,
    focus: 1,
  }
  ActivityBarStates.set(uid, oldState, newState)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([4, 6, 7, 11])
})

test('diff2 works with different uid values', () => {
  const uid = 99
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    focused: true,
  }
  ActivityBarStates.set(uid, oldState, newState)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([4, 6, 7, 11])
})

test('diff2 handles focusedIndex changes', () => {
  const uid = 8
  const oldState = {
    ...createDefaultState(),
    focusedIndex: 0,
  }
  const newState = {
    ...createDefaultState(),
    focusedIndex: 1,
  }
  ActivityBarStates.set(uid, oldState, newState)

  const result: readonly number[] = Diff2.diff2(uid)

  expect(result).toEqual([4, 11])
})
