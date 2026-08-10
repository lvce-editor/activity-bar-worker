import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { resolveActiveViewIds } from '../src/parts/ResolveActiveViewIds/ResolveActiveViewIds.ts'

const items: readonly ActivityBarItem[] = [
  { flags: 0, icon: 'files', id: 'Explorer', keyShortcuts: '', title: 'Explorer' },
  { flags: 0, icon: 'search', id: 'Search', keyShortcuts: '', title: 'Search' },
]

test('resolveActiveViewIds preserves explicit active views', () => {
  const state = { ...createDefaultState(), activeViewIds: ['Explorer', 'Search'], selectedIndex: 0 }
  expect(resolveActiveViewIds(state, items)).toEqual(['Explorer', 'Search'])
})

test('resolveActiveViewIds returns no views when there is no legacy selection', () => {
  expect(resolveActiveViewIds(createDefaultState(), items)).toEqual([])
})

test('resolveActiveViewIds migrates a legacy selection from existing items', () => {
  const state = { ...createDefaultState(), activityBarItems: items, selectedIndex: 1 }
  expect(resolveActiveViewIds(state, [])).toEqual(['Search'])
})

test('resolveActiveViewIds migrates a legacy selection from rebuilt items', () => {
  const state = { ...createDefaultState(), selectedIndex: 0 }
  expect(resolveActiveViewIds(state, items)).toEqual(['Explorer'])
})

test('resolveActiveViewIds ignores a missing legacy selection', () => {
  const state = { ...createDefaultState(), selectedIndex: 5 }
  expect(resolveActiveViewIds(state, items)).toEqual([])
})
