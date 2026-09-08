import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusLast } from '../src/parts/FocusLast/FocusLast.ts'

const items: readonly ActivityBarItem[] = [
  {
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 0,
    hasPopup: false,
    icon: 'explorer',
    id: 'Explorer',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Explorer',
  },
  {
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 0,
    hasPopup: false,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Settings',
  },
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
