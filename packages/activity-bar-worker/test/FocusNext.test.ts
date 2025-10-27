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
    focusedIndex: 2,
    focused: false,
    activityBarItems: items,
    currentViewletId: 'test-viewlet',
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
