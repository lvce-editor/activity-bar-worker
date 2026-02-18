import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleFocus } from '../src/parts/HandleFocus/HandleFocus.ts'

test('handleFocus sets focused to true', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
  }

  const result: ActivityBarState = handleFocus(state)

  expect(result.focused).toBe(true)
  expect(result).not.toBe(state)
})

test('handleFocus preserves other state properties', () => {
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

  const result: ActivityBarState = handleFocus(state)

  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.activityBarItems).toBe(state.activityBarItems)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})

test('handleFocus works when focused is already true', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
  }

  const result: ActivityBarState = handleFocus(state)

  expect(result.focused).toBe(true)
  expect(result).not.toBe(state)
})

test('handleFocus returns new state object', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = handleFocus(state)

  expect(result).not.toBe(state)
})
