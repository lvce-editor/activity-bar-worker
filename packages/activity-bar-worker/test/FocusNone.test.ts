import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusNone } from '../src/parts/FocusNone/FocusNone.ts'

test('focusNone returns same state when focusedIndex is -1', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
  }

  const result: ActivityBarState = focusNone(state)

  expect(result).toBe(state)
})

test('focusNone calls focusIndex with -1 when focusedIndex is not -1', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 2,
  }

  const result: ActivityBarState = focusNone(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('focusNone preserves other state properties', () => {
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
    currentViewletId: 'test-viewlet',
    focused: true,
    focusedIndex: 3,
  }

  const result: ActivityBarState = focusNone(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.focused).toBe(state.focused)
  expect(result.activityBarItems).toBe(state.activityBarItems)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})

test('focusNone handles focusedIndex of 0', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
  }

  const result: ActivityBarState = focusNone(state)

  expect(result.focusedIndex).toBe(-1)
})

test('focusNone handles large focusedIndex', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 10,
  }

  const result: ActivityBarState = focusNone(state)

  expect(result.focusedIndex).toBe(-1)
})
