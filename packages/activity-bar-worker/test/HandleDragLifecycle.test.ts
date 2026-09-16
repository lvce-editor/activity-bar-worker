import { expect, test } from '@jest/globals'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleDragEnd } from '../src/parts/HandleDragEnd/HandleDragEnd.ts'
import { handleDragLeave } from '../src/parts/HandleDragLeave/HandleDragLeave.ts'
import { handleDragStart } from '../src/parts/HandleDragStart/HandleDragStart.ts'

const items: any = [
  { flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled, id: 'Explorer' },
  { flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled, id: 'Search' },
]

test('drag start records a movable item when enabled', () => {
  const state = { ...createDefaultState(), dragAndDropEnabled: true, filteredItems: items }

  expect(handleDragStart(state, 'Explorer')).toMatchObject({ draggedItemId: 'Explorer' })
})

test('drag start ignores disabled settings and invalid items', () => {
  const state = { ...createDefaultState(), filteredItems: items }
  const enabledState = { ...state, dragAndDropEnabled: true }

  expect(handleDragStart(state, 'Explorer')).toBe(state)
  expect(handleDragStart(enabledState, 'Settings')).toBe(enabledState)
})

test('drag end and leave clear their transient state', () => {
  const emptyState = createDefaultState()
  const state = { ...createDefaultState(), draggedItemId: 'Explorer', dropIndicator: { id: 'Search', position: 'before' as const } }

  expect(handleDragEnd(state)).toEqual({ ...createDefaultState(), draggedItemId: undefined, dropIndicator: undefined })
  expect(handleDragLeave(state)).toEqual({ ...createDefaultState(), draggedItemId: 'Explorer', dropIndicator: undefined })
  expect(handleDragEnd(emptyState)).toBe(emptyState)
  expect(handleDragLeave(emptyState)).toBe(emptyState)
})
