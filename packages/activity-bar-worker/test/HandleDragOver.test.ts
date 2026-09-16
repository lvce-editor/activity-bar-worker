import { expect, test } from '@jest/globals'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleDragOver } from '../src/parts/HandleDragOver/HandleDragOver.ts'

const createItem = (id: string, flags = ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled): any => ({ flags, id })

test('shows an insertion indicator for a valid target', () => {
  const items = [createItem('Explorer'), createItem('Search'), createItem('Source Control')]
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    dragAndDropEnabled: true,
    draggedItemId: 'Explorer',
    filteredItems: items,
    itemHeight: 48,
  }

  expect(handleDragOver(state, 100).dropIndicator).toEqual({ id: 'Source Control', position: 'before' })
})

test('clears the indicator for self and adjacent drops', () => {
  const items = [createItem('Explorer'), createItem('Search'), createItem('Source Control')]
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    dragAndDropEnabled: true,
    draggedItemId: 'Explorer',
    filteredItems: items,
    itemHeight: 48,
  }

  expect(handleDragOver(state, 24).dropIndicator).toBeUndefined()
  expect(handleDragOver(state, 70).dropIndicator).toBeUndefined()
})

test('clears the indicator for an adjacent drop after the target', () => {
  const items = [createItem('Explorer'), createItem('Search'), createItem('Source Control')]
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    dragAndDropEnabled: true,
    draggedItemId: 'Search',
    filteredItems: items,
    itemHeight: 48,
  }

  expect(handleDragOver(state, 44).dropIndicator).toBeUndefined()
})

test('does not target bottom or synthetic items', () => {
  const items = [createItem('Explorer'), createItem('Additional Views'), createItem('Settings', ActivityBarItemFlags.Button)]
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    dragAndDropEnabled: true,
    draggedItemId: 'Explorer',
    filteredItems: items,
    itemHeight: 48,
  }

  expect(handleDragOver(state, 70).dropIndicator).toBeUndefined()
})

test('ignores drags without a movable source and positions outside the bar', () => {
  const state = { ...createDefaultState(), filteredItems: [createItem('Explorer')] }

  expect(handleDragOver(state, 24)).toBe(state)
  expect(handleDragOver({ ...state, dragAndDropEnabled: true, draggedItemId: 'Explorer' }, 500).dropIndicator).toBeUndefined()
})

test('clears an existing indicator when the pointer leaves the bar', () => {
  const items = [createItem('Explorer'), createItem('Search')]
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    dragAndDropEnabled: true,
    draggedItemId: 'Explorer',
    dropIndicator: { id: 'Search', position: 'before' as const },
    filteredItems: items,
    itemHeight: 48,
  }

  expect(handleDragOver(state, 500).dropIndicator).toBeUndefined()
})
