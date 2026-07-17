import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusNext } from '../src/parts/FocusNext/FocusNext.ts'

const items: readonly ActivityBarItem[] = [
  { flags: 0, icon: 'explorer', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
  { flags: 0, icon: 'search', id: 'Search', keyShortcuts: '', title: 'Search' },
]

test('focusNext focuses the next visible item', () => {
  const state = { ...createDefaultState(), filteredItems: items, focused: false, focusedIndex: 0 }
  const result = focusNext(state)

  expect(result.focusedIndex).toBe(1)
  expect(result.focused).toBe(true)
})

test('focusNext focuses the first item when no item is focused', () => {
  const state = { ...createDefaultState(), filteredItems: items, focusedIndex: -1 }

  expect(focusNext(state).focusedIndex).toBe(0)
})

test('focusNext stops at the last visible item', () => {
  const state = { ...createDefaultState(), filteredItems: items, focusedIndex: 1 }

  expect(focusNext(state)).toBe(state)
})

test('focusNext does nothing when there are no visible items', () => {
  const state = { ...createDefaultState(), filteredItems: [], focusedIndex: -1 }

  expect(focusNext(state)).toBe(state)
})
