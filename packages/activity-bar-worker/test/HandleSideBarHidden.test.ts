import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSideBarHidden } from '../src/parts/HandleSideBarHidden/HandleSideBarHidden.ts'

test('handleSideBarHidden sets focusedIndex to -1', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 5,
  }

  const result: ActivityBarState = handleSideBarHidden(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handleSideBarHidden sets selectedIndex to -1', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    selectedIndex: 3,
  }

  const result: ActivityBarState = handleSideBarHidden(state)

  expect(result.selectedIndex).toBe(-1)
  expect(result).not.toBe(state)
})

test('handleSideBarHidden sets both focusedIndex and selectedIndex to -1', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 2,
    selectedIndex: 1,
  }

  const result: ActivityBarState = handleSideBarHidden(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.selectedIndex).toBe(-1)
})

test('handleSideBarHidden preserves other state properties', () => {
  const items: readonly ActivityBarItem[] = [
    { id: 'item1', title: 'Item 1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item 2', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'test-viewlet',
    focused: true,
    focus: 2,
    sideBarVisible: true,
    width: 100,
    itemHeight: 50,
  }

  const result: ActivityBarState = handleSideBarHidden(state)

  expect(result.activityBarItems).toEqual(state.activityBarItems)
  expect(result.currentViewletId).toBe(state.currentViewletId)
  expect(result.focused).toBe(state.focused)
  expect(result.focus).toBe(state.focus)
  expect(result.sideBarVisible).toBe(false)
  expect(result.width).toBe(state.width)
  expect(result.itemHeight).toBe(state.itemHeight)
})

test('handleSideBarHidden handles state with already negative indices', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: -1,
    selectedIndex: -1,
  }

  const result: ActivityBarState = handleSideBarHidden(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.selectedIndex).toBe(-1)
})

test('handleSideBarHidden handles state with positive indices', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focusedIndex: 0,
    selectedIndex: 0,
  }

  const result: ActivityBarState = handleSideBarHidden(state)

  expect(result.focusedIndex).toBe(-1)
  expect(result.selectedIndex).toBe(-1)
})

test('handleSideBarHidden returns new state object', () => {
  const state: ActivityBarState = createDefaultState()

  const result: ActivityBarState = handleSideBarHidden(state)

  expect(result).not.toBe(state)
})
