import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focus } from '../src/parts/Focus/Focus.ts'
import * as FocusId from '../src/parts/FocusId/FocusId.ts'

test('focus sets focus to List when state.focus is falsy', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: 0,
  }

  const result: ActivityBarState = focus(state)

  expect(result.focus).toBe(FocusId.List)
  expect(result).not.toBe(state)
})

test('focus returns same state when state.focus is truthy', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: 2,
  }

  const result: ActivityBarState = focus(state)

  expect(result).toBe(state)
  expect(result.focus).toBe(2)
})

test('focus preserves other state properties when setting focus', () => {
  const items: readonly ActivityBarItem[] = [
    {
      flags: 0,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      title: 'Item 1',
    },
    {
      flags: 0,
      icon: 'icon2',
      id: 'item2',
      keyShortcuts: '',
      title: 'Item 2',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    focus: 0,
    focused: true,
    focusedIndex: 2,
  }

  const result: ActivityBarState = focus(state)

  expect(result.focus).toBe(FocusId.List)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.focused).toBe(state.focused)
  expect(result.activityBarItems).toBe(state.activityBarItems)
})

test('focus returns same state when focus is negative', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: -1,
  }

  const result: ActivityBarState = focus(state)

  expect(result).toBe(state)
  expect(result.focus).toBe(-1)
})

test('focus returns same state when focus is already List', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: FocusId.List,
  }

  const result: ActivityBarState = focus(state)

  expect(result).toBe(state)
  expect(result.focus).toBe(FocusId.List)
})

test('focus sets focus to List when focus is 0', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: 0,
  }

  const result: ActivityBarState = focus(state)

  expect(result.focus).toBe(FocusId.List)
  expect(result).not.toBe(state)
})

test('focus returns same state when focus is 5', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focus: 5,
  }

  const result: ActivityBarState = focus(state)

  expect(result).toBe(state)
  expect(result.focus).toBe(5)
})
