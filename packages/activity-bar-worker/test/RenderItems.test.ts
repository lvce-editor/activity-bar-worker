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
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    uid: 123,
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
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    uid: 456,
  }

  const result: any = renderItems(oldState, newState)

  expect(result[1]).toBe(456)
})

test('renderItems returns DOM structure', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = []
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    uid: 789,
  }

  const result: any = renderItems(oldState, newState)

  expect(result[2]).toBeDefined()
  expect(Array.isArray(result[2])).toBe(true)
})

test('renderItems ignores oldState', () => {
  const oldItems: readonly any[] = [{ flags: 0, icon: 'oldIcon', id: 'old', keyShortcuts: '', title: 'Old' }]
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: oldItems,
    filteredItems: getFilteredActivityBarItems(oldItems, 400, 48),
    uid: 111,
  }
  const newItems: readonly any[] = [{ flags: 0, icon: 'newIcon', id: 'new', keyShortcuts: '', title: 'New' }]
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: newItems,
    filteredItems: getFilteredActivityBarItems(newItems, 400, 48),
    uid: 222,
  }

  const result: any = renderItems(oldState, newState)

  expect(result[1]).toBe(222)
})

test('renderItems uses newState activityBarItems', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item2' },
  ]
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    initial: false,
    uid: 333,
  }

  const result: any = renderItems(oldState, newState)

  expect(result[2].length).toBeGreaterThan(0)
})

test('renderItems returns new command each time', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = []
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    uid: 444,
  }

  const result1: any = renderItems(oldState, newState)
  const result2: any = renderItems(oldState, newState)

  expect(result1).not.toBe(result2)
})

test('renderItems returns command with correct structure', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = [{ flags: 0, icon: 'icon', id: 'test', keyShortcuts: '', title: 'Test' }]
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    initial: false,
    uid: 555,
  }

  const result: any = renderItems(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetDom2)
  expect(result[1]).toBe(555)
  expect(result[2]).toBeDefined()
})

test('renderItems returns empty DOM when initial is true', () => {
  const oldState: ActivityBarState = createDefaultState()
  const items: readonly any[] = [{ flags: 0, icon: 'icon', id: 'test', keyShortcuts: '', title: 'Test' }]
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: getFilteredActivityBarItems(items, 400, 48),
    initial: true,
    uid: 666,
  }

  const result: any = renderItems(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetDom2)
  expect(result[1]).toBe(666)
  expect(result[2]).toEqual([])
})
