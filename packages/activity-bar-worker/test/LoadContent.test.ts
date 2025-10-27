import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent returns state with activityBarItems', async () => {
  const state: ActivityBarState = createDefaultState()
  const savedState: any = {}

  const result: ActivityBarState = await loadContent(state, savedState)

  expect(result).not.toBe(state)
  expect(result.activityBarItems).toBeDefined()
  expect(Array.isArray(result.activityBarItems)).toBe(true)
  expect(result.activityBarItems.length).toBeGreaterThan(0)
})

test('loadContent preserves other state properties', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: 123,
    width: 100,
    currentViewletId: 'test',
  }
  const savedState: any = {}

  const result: ActivityBarState = await loadContent(state, savedState)

  expect(result.uid).toBe(123)
  expect(result.width).toBe(100)
  expect(result.currentViewletId).toBe('Explorer')
})

test('loadContent adds activityBarItems to state', async () => {
  const state: ActivityBarState = createDefaultState()
  const savedState: any = {}

  const result: ActivityBarState = await loadContent(state, savedState)

  expect(result.activityBarItems.length).toBe(6)
  expect(result.activityBarItems[0].id).toBeDefined()
  expect(result.activityBarItems[0].title).toBeDefined()
  expect(result.activityBarItems[0].icon).toBeDefined()
})

test('loadContent returns new state object', async () => {
  const state: ActivityBarState = createDefaultState()
  const savedState: any = {}

  const result: ActivityBarState = await loadContent(state, savedState)

  expect(result).not.toBe(state)
})
