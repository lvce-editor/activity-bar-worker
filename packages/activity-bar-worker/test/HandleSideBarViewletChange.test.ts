import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSideBarViewletChange } from '../src/parts/HandleSideBarViewletChange/HandleSideBarViewletChange.ts'

test('handleSideBarViewletChange sets selectedIndex to found index', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }],
    selectedIndex: -1,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'item2')

  expect(result.selectedIndex).toBe(1)
  expect(result).not.toBe(state)
})

test('handleSideBarViewletChange sets selectedIndex to -1 when item not found', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'item1' }, { id: 'item2' }],
    selectedIndex: 0,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'nonexistent')

  expect(result.selectedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handleSideBarViewletChange preserves other state properties', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'item1' }, { id: 'item2' }],
    selectedIndex: 0,
    focusedIndex: 1,
    focused: true,
    currentViewletId: 'test-viewlet',
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'item2')

  expect(result.selectedIndex).toBe(1)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.focused).toBe(state.focused)
  expect(result.currentViewletId).toBe(state.currentViewletId)
  expect(result.activityBarItems).toBe(state.activityBarItems)
})

test('handleSideBarViewletChange handles empty activityBarItems', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [],
    selectedIndex: 0,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'any')

  expect(result.selectedIndex).toBe(-1)
})

test('handleSideBarViewletChange handles first item', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'first' }, { id: 'second' }],
    selectedIndex: -1,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'first')

  expect(result.selectedIndex).toBe(0)
})

test('handleSideBarViewletChange handles last item', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'first' }, { id: 'second' }, { id: 'third' }],
    selectedIndex: -1,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'third')

  expect(result.selectedIndex).toBe(2)
})
