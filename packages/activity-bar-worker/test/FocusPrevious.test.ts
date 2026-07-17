import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusPrevious } from '../src/parts/FocusPrevious/FocusPrevious.ts'

const items: readonly ActivityBarItem[] = [
  { flags: 0, icon: 'explorer', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
  { flags: 0, icon: 'search', id: 'Search', keyShortcuts: '', title: 'Search' },
]

test('focusPrevious focuses the previous visible item', () => {
  const state = { ...createDefaultState(), filteredItems: items, focused: false, focusedIndex: 1 }
  const result = focusPrevious(state)

  expect(result.focusedIndex).toBe(0)
  expect(result.focused).toBe(true)
})

test('focusPrevious stops at the first visible item', () => {
  const state = { ...createDefaultState(), filteredItems: items, focusedIndex: 0 }

  expect(focusPrevious(state)).toBe(state)
})
