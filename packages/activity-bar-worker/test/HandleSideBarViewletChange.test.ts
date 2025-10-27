import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSideBarViewletChange } from '../src/parts/HandleSideBarViewletChange/HandleSideBarViewletChange.ts'

test('handleSideBarViewletChange sets selectedIndex to found index', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
    { id: 'item3', title: 'Item 3', icon: 'icon3', flags: 0, keyShortcuts: '' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: -1,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'item2')

  expect(result.selectedIndex).toBe(1)
  expect(result).not.toBe(state)
})

test('handleSideBarViewletChange sets selectedIndex to -1 when item not found', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: 0,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'nonexistent')

  expect(result.selectedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handleSideBarViewletChange preserves other state properties', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: 0,
    focusedIndex: 1,
    focused: true,
    currentViewletId: 'test-viewlet',
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'item2')

  expect(result.selectedIndex).toBe(1)
  expect(result.focusedIndex).toBe(state.focusedIndex)
  expect(result.focused).toBe(state.focused)
  expect(result.activityBarItems).toEqual(state.activityBarItems)
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
  const items: readonly ActivityBarItem[] = [
    { id: 'first', title: 'First', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'second', title: 'Second', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: -1,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'first')

  expect(result.selectedIndex).toBe(0)
})

test('handleSideBarViewletChange handles last item', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'first', title: 'First', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'second', title: 'Second', icon: 'icon2', flags: 0, keyShortcuts: '' },
    { id: 'third', title: 'Third', icon: 'icon3', flags: 0, keyShortcuts: '' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    selectedIndex: -1,
  }

  const result: ActivityBarState = handleSideBarViewletChange(state, 'third')

  expect(result.selectedIndex).toBe(2)
})
