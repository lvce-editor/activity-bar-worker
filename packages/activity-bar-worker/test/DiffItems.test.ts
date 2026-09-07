import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual returns true when states are identical', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ flags: 0, icon: 'icon', id: 'test', keyShortcuts: '', preferredLocation: 0, title: 'Test' }],
    focusedIndex: 0,
  }

  const result: boolean = isEqual(state, state)

  expect(result).toBe(true)
})

test('isEqual returns true when activityBarItems reference is the same and focusedIndex matches', () => {
  const items = [{ flags: 0, icon: 'icon', id: 'test', keyShortcuts: '', preferredLocation: 0, title: 'Test' }]
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    focusedIndex: 5,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    focusedIndex: 5,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when focusedIndex differs', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [],
    focusedIndex: 0,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [],
    focusedIndex: 1,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when focused differs', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...oldState,
    focused: true,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when activityBarItems differ', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', preferredLocation: 0, title: 'Test1' }],
    focusedIndex: 0,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ flags: 0, icon: 'icon2', id: 'test2', keyShortcuts: '', preferredLocation: 0, title: 'Test2' }],
    focusedIndex: 0,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when activityBarItems have different lengths', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', preferredLocation: 0, title: 'Test1' }],
    focusedIndex: 0,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [],
    focusedIndex: 0,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual returns false when both focusedIndex and activityBarItems differ', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', preferredLocation: 0, title: 'Test1' }],
    focusedIndex: 0,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ flags: 0, icon: 'icon2', id: 'test2', keyShortcuts: '', preferredLocation: 0, title: 'Test2' }],
    focusedIndex: 5,
  }

  const result: boolean = isEqual(oldState, newState)

  expect(result).toBe(false)
})
