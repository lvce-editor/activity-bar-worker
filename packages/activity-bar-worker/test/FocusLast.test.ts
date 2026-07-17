import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusLast } from '../src/parts/FocusLast/FocusLast.ts'

const items: readonly ActivityBarItem[] = [
  { flags: 0, icon: 'explorer', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
  { flags: 0, icon: 'settings', id: 'Settings', keyShortcuts: '', title: 'Settings' },
]

test('focusLast focuses the last visible item', () => {
  const result = focusLast({ ...createDefaultState(), filteredItems: items, focused: false, focusedIndex: 0 })

  expect(result.focusedIndex).toBe(1)
  expect(result.focused).toBe(true)
})

test('focusLast keeps an empty activity bar unfocused', () => {
  const result = focusLast({ ...createDefaultState(), filteredItems: [], focusedIndex: -1 })

  expect(result.focusedIndex).toBe(-1)
})
