import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusFirst } from '../src/parts/FocusFirst/FocusFirst.ts'

const item: ActivityBarItem = { flags: 0, icon: 'explorer', id: 'Explorer', keyShortcuts: '', title: 'Explorer' }

test('focusFirst focuses the first visible item', () => {
  const state = { ...createDefaultState(), filteredItems: [item], focused: false, focusedIndex: -1 }
  const result = focusFirst(state)

  expect(result.focusedIndex).toBe(0)
  expect(result.focused).toBe(true)
})

test('focusFirst keeps an empty activity bar unfocused', () => {
  const result = focusFirst({ ...createDefaultState(), filteredItems: [], focusedIndex: -1 })

  expect(result.focusedIndex).toBe(-1)
})
