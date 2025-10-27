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
      id: 'item1',
      title: 'Item 1',
      icon: 'icon1',
      flags: 0,
      keyShortcuts: '',
    },
    {
      id: 'item2',
      title: 'Item 2',
      icon: 'icon2',
      flags: 0,
      keyShortcuts: '',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 5,
    focused: false,
    activityBarItems: items,
    currentViewletId: 'test-viewlet',
  }

  const result: ActivityBarState = focusFirst(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.focused).toBe(true)
  expect(result.activityBarItems).toBe(state.activityBarItems)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})
