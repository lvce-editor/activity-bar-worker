import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual returns true when states are identical', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    activityBarItems: [{ id: 'test', title: 'Test', icon: 'icon', flags: 0, keyShortcuts: '' }],
  }

  const result: boolean = isEqual(state, state)

  expect(result).toBe(true)
})

test('isEqual returns true when activityBarItems reference is the same and focusedIndex matches', () => {
  const items = [{ id: 'test', title: 'Test', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 5,
    activityBarItems: items,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 5,
    activityBarItems: items,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual returns false when focusedIndex differs', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    activityBarItems: [],
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 1,
    activityBarItems: [],
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when activityBarItems differ', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    activityBarItems: [{ id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '' }],
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    activityBarItems: [{ id: 'test2', title: 'Test2', icon: 'icon2', flags: 0, keyShortcuts: '' }],
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when activityBarItems have different lengths', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    activityBarItems: [{ id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '' }],
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    activityBarItems: [],
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when both focusedIndex and activityBarItems differ', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    activityBarItems: [{ id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '' }],
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 5,
    activityBarItems: [{ id: 'test2', title: 'Test2', icon: 'icon2', flags: 0, keyShortcuts: '' }],
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})
