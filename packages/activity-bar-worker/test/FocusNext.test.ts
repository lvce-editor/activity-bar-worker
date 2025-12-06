import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusNext } from '../src/parts/FocusNext/FocusNext.ts'

test('focusNext calls focusIndex with -1', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = focusNext(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('focusNext preserves other state properties', () => {
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
    focusedIndex: 2,
  }

  const result: ActivityBarState = focusNext(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.focused).toBe(true)
  expect(result.activityBarItems).toBe(state.activityBarItems)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})

test('focusNext returns new state object', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = focusNext(state)

  expect(result).not.toBe(state)
})
