import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'

test('render2 updates states in registry and returns commands', () => {
  const uid = 123
  const oldState: ActivityBarState = { ...createDefaultState(), uid, focusedIndex: 0 }
  const newState: ActivityBarState = { ...createDefaultState(), uid, focusedIndex: 1 }
  ActivityBarStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderItems]

  const commands = render2(uid, diffResult)

  expect(commands).toBeDefined()
  expect(Array.isArray(commands)).toBe(true)
  const { oldState: storedOldState, newState: storedNewState } = ActivityBarStates.get(uid)
  expect(storedOldState).toEqual(storedNewState)
})

test('render2 returns empty commands array for empty diffResult', () => {
  const uid = 456
  const oldState: ActivityBarState = { ...createDefaultState(), uid, focusedIndex: 0 }
  const newState: ActivityBarState = { ...createDefaultState(), uid, focusedIndex: 1 }
  ActivityBarStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = []

  const commands = render2(uid, diffResult)

  expect(commands).toEqual([])
})

test('render2 handles multiple diff types', () => {
  const uid = 789
  const oldState: ActivityBarState = { ...createDefaultState(), uid, focusedIndex: 0 }
  const newState: ActivityBarState = { ...createDefaultState(), uid, focusedIndex: 1 }
  ActivityBarStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderItems, DiffType.RenderCss]

  const commands = render2(uid, diffResult)

  expect(commands.length).toBeGreaterThan(0)
})

test('render2 updates registry states correctly', () => {
  const uid = 111
  const oldState: ActivityBarState = { ...createDefaultState(), uid, focusedIndex: 0 }
  const newState: ActivityBarState = { ...createDefaultState(), uid, focusedIndex: 1 }
  ActivityBarStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderFocusContext]

  render2(uid, diffResult)

  const { oldState: storedOldState, newState: storedNewState } = ActivityBarStates.get(uid)
  expect(storedOldState.focusedIndex).toBe(1)
  expect(storedNewState.focusedIndex).toBe(1)
  expect(storedOldState).toEqual(storedNewState)
})
