import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleFocus } from '../src/parts/HandleFocus/HandleFocus.ts'

const explorer: ActivityBarItem = {
  flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected,
  icon: 'explorer',
  id: 'Explorer',
  keyShortcuts: '',
  title: 'Explorer',
}
const search: ActivityBarItem = { flags: ActivityBarItemFlags.Enabled, icon: 'search', id: 'Search', keyShortcuts: '', title: 'Search' }

test('handleFocus focuses the selected visible item', () => {
  const state: ActivityBarState = { ...createDefaultState(), filteredItems: [explorer, search], focused: false, focusedIndex: -1 }
  const result = handleFocus(state)

  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(0)
})

test('handleFocus preserves a valid focused index', () => {
  const state: ActivityBarState = { ...createDefaultState(), filteredItems: [explorer, search], focused: false, focusedIndex: 1 }

  expect(handleFocus(state).focusedIndex).toBe(1)
})

test('handleFocus uses the first item when none is selected', () => {
  const state: ActivityBarState = { ...createDefaultState(), filteredItems: [search], focusedIndex: -1 }

  expect(handleFocus(state).focusedIndex).toBe(0)
})

test('handleFocus handles an empty activity bar', () => {
  const state: ActivityBarState = { ...createDefaultState(), filteredItems: [], focusedIndex: -1 }

  expect(handleFocus(state).focusedIndex).toBe(-1)
})
