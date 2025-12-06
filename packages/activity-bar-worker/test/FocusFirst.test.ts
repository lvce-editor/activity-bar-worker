import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusFirst } from '../src/parts/FocusFirst/FocusFirst.ts'

test('focusFirst sets focusedIndex to -1 and focused to true', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = focusFirst(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.focused).toBe(true)
})

test('focusFirst preserves other state properties', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = focusFirst(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.focused).toBe(true)
})

test('focusFirst returns a new state object', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = focusFirst(state)

  expect(result).not.toBe(state)
})

test('focusFirst works with custom state', () => {
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
    focused: false,
    focusedIndex: 5,
  }

  const result: ActivityBarState = focusFirst(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.focused).toBe(true)
  expect(result.activityBarItems).toBe(state.activityBarItems)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})
