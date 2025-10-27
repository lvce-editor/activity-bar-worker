import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleBlur } from '../src/parts/HandleBlur/HandleBlur.ts'

test('handleBlur sets focused to false', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
  }

  const result: ActivityBarState = handleBlur(state)

  expect(result.focused).toBe(false)
  expect(result).not.toBe(state)
})

test('handleBlur preserves other state properties', () => {
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
    focused: true,
    focusedIndex: 2,
    activityBarItems: items,
    currentViewletId: 'test-viewlet',
  }

  const result: ActivityBarState = handleBlur(state)

  expect(result.focused).toBe(false)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.activityBarItems).toBe(state.activityBarItems)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})

test('handleBlur works when focused is already false', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
  }

  const result: ActivityBarState = handleBlur(state)

  expect(result.focused).toBe(false)
  expect(result).not.toBe(state)
})

test('handleBlur returns new state object', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = handleBlur(state)

  expect(result).not.toBe(state)
})
