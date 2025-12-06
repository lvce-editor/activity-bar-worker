import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleResize } from '../src/parts/HandleResize/HandleResize.ts'

test('handleResize updates dimensions', () => {
  const state: ActivityBarState = createDefaultState()
  const dimensions = { height: 200, width: 50, x: 10, y: 20 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.height).toBe(200)
  expect(result.width).toBe(50)
  expect(result.x).toBe(10)
  expect(result.y).toBe(20)
  expect(result).not.toBe(state)
})

test('handleResize updates filteredItems when all items fit', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    itemHeight: 48,
  }

  const dimensions = { height: 200, width: 48, x: 0, y: 0 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.filteredItems.length).toBe(3)
  expect(result.filteredItems[0].id).toBe('item1')
  expect(result.filteredItems[1].id).toBe('item2')
  expect(result.filteredItems[2].id).toBe('item3')
})

test('handleResize updates filteredItems when not all items fit', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
    { flags: 0, icon: 'icon5', id: 'item5', keyShortcuts: '', title: 'Item 5' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    itemHeight: 48,
  }

  const dimensions = { height: 144, width: 48, x: 0, y: 0 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.filteredItems.length).toBe(3)
  expect(result.filteredItems[0].id).toBe('item1')
  expect(result.filteredItems[1].id).toBe('Additional Views')
  expect(result.filteredItems[2].id).toBe('item5')
})

test('handleResize preserves other state properties', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'test-viewlet',
    focus: 1,
    focused: true,
    focusedIndex: 2,
    selectedIndex: 0,
    uid: 123,
  }

  const dimensions = { height: 300, width: 60, x: 5, y: 10 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.focus).toBe(1)
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(2)
  expect(result.selectedIndex).toBe(0)
  expect(result.uid).toBe(123)
  expect(result.currentViewletId).toBe('test-viewlet')
  expect(result.height).toBe(300)
  expect(result.width).toBe(60)
  expect(result.x).toBe(5)
  expect(result.y).toBe(10)
})

test('handleResize handles empty activityBarItems', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [],
    itemHeight: 48,
  }

  const dimensions = { height: 200, width: 48, x: 0, y: 0 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.filteredItems.length).toBe(0)
  expect(result.height).toBe(200)
  expect(result.width).toBe(48)
})

test('handleResize handles zero height', () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    itemHeight: 48,
  }

  const dimensions = { height: 0, width: 48, x: 0, y: 0 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.filteredItems.length).toBe(2)
  expect(result.filteredItems[0].id).toBe('Additional Views')
  expect(result.filteredItems[1].id).toBe('item1')
})

test('handleResize handles single item that fits', () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    itemHeight: 48,
  }

  const dimensions = { height: 48, width: 48, x: 0, y: 0 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.filteredItems.length).toBe(1)
  expect(result.filteredItems[0].id).toBe('item1')
})

test('handleResize handles many items with small height', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
    { flags: 0, icon: 'icon5', id: 'item5', keyShortcuts: '', title: 'Item 5' },
    { flags: 0, icon: 'icon6', id: 'item6', keyShortcuts: '', title: 'Item 6' },
    { flags: 0, icon: 'icon7', id: 'item7', keyShortcuts: '', title: 'Item 7' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    itemHeight: 48,
  }

  const dimensions = { height: 96, width: 48, x: 0, y: 0 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.filteredItems.length).toBe(2)
  expect(result.filteredItems[0].id).toBe('Additional Views')
  expect(result.filteredItems[1].id).toBe('item7')
})

test('handleResize uses correct itemHeight from state', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    itemHeight: 60,
  }

  const dimensions = { height: 120, width: 48, x: 0, y: 0 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result.filteredItems.length).toBe(2)
  expect(result.filteredItems[0].id).toBe('Additional Views')
  expect(result.filteredItems[1].id).toBe('item3')
})

test('handleResize returns new state object', () => {
  const state: ActivityBarState = createDefaultState()
  const dimensions = { height: 200, width: 48, x: 0, y: 0 }
  const result: ActivityBarState = handleResize(state, dimensions)

  expect(result).not.toBe(state)
  expect(result.filteredItems).not.toBe(state.filteredItems)
})
