import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getFilteredActivityBarItems } from '../src/parts/GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems returns commands with SetDom2', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = []
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 123,
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result: any = renderItems(oldState, newState)

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(3)
  expect(result[0]).toBe(ViewletCommand.SetDom2)
  expect(result[1]).toBe(123)
})

test('renderItems returns correct uid', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = []
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 456,
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result: any = renderItems(oldState, newState)

  expect(result[1]).toBe(456)
})

test('renderItems returns DOM structure', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = []
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 789,
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result: any = renderItems(oldState, newState)

  expect(result[2]).toBeDefined()
  expect(Array.isArray(result[2])).toBe(true)
})

test('renderItems ignores oldState', () => {
  const oldItems: readonly any[] = [{ id: 'old', title: 'Old', icon: 'oldIcon', flags: 0, keyShortcuts: '' }]
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    uid: 111,
    activityBarItems: oldItems,
    filteredItems: getFilteredActivityBarItems(oldItems, 400, 48),
  }
  const newItems: readonly any[] = [{ id: 'new', title: 'New', icon: 'newIcon', flags: 0, keyShortcuts: '' }]
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 222,
    activityBarItems: newItems,
    filteredItems: getFilteredActivityBarItems(newItems, 400, 48),
  }

  const result: any = renderItems(oldState, newState)

  expect(result[1]).toBe(222)
})

test('renderItems uses newState activityBarItems', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = [
    { id: 'item1', title: 'Item1', icon: 'icon1', flags: 0, keyShortcuts: '' },
    { id: 'item2', title: 'Item2', icon: 'icon2', flags: 0, keyShortcuts: '' },
  ]
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 333,
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result: any = renderItems(oldState, newState)

  expect(result[2].length).toBeGreaterThan(0)
})

test('renderItems returns new command each time', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = []
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 444,
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result1: any = renderItems(oldState, newState)
  const result2: any = renderItems(oldState, newState)

  expect(result1).not.toBe(result2)
})

test('renderItems returns command with correct structure', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = [{ id: 'test', title: 'Test', icon: 'icon', flags: 0, keyShortcuts: '' }]
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 555,
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
  }

  const result: any = renderItems(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetDom2)
  expect(result[1]).toBe(555)
  expect(result[2]).toBeDefined()
})
