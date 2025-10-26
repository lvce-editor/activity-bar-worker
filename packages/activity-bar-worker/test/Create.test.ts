import { test, expect } from '@jest/globals'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('Create.create should create a new ActivityBarState', () => {
  const result = Create.create(123, 'test-uri', 10, 20, 200, 300, {}, null, 1)

  expect(result).toBeDefined()
  expect(result.uid).toBe(123)
  expect(result.currentViewletId).toBe('')
  expect(result.focus).toBe(0)
  expect(result.focused).toBe(false)
  expect(result.focusedIndex).toBe(-1)
  expect(result.scrollBarHeight).toBe(0)
  expect(result.width).toBe(0)
  expect(result.x).toBe(0)
  expect(result.y).toBe(0)
  expect(result.sideBarVisible).toBe(false)
  expect(result.activityBarItems).toEqual([])
  expect(result.selectedIndex).toBe(-1)
})

test('Create.create should set state in ActivityBarStates', () => {
  const result = Create.create(456, 'test-uri', 0, 0, 0, 0, {}, null, 0)

  const stateFromRegistry = ActivityBarStates.get(456)
  expect(stateFromRegistry.oldState).toEqual(result)
  expect(stateFromRegistry.newState).toEqual(result)
})

test('Create.create should accept different parameters', () => {
  const result1 = Create.create(1, 'uri1', 0, 0, 0, 0, {}, null, 0)
  const result2 = Create.create(2, 'uri2', 100, 200, 300, 400, { test: 'data' }, 999, 1)

  expect(result1.uid).toBe(1)
  expect(result2.uid).toBe(2)
})

test('Create.create should use default platform parameter', () => {
  const result = Create.create(789, 'test-uri', 0, 0, 0, 0, {}, null)

  expect(result).toBeDefined()
  expect(result.uid).toBe(789)
})
