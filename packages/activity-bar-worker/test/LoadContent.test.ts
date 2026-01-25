import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent returns state with activityBarItems', async () => {
  const state: ActivityBarState = createDefaultState()

  const result: ActivityBarState = await loadContent(state)

  expect(result).not.toBe(state)
  expect(result.activityBarItems).toBeDefined()
  expect(Array.isArray(result.activityBarItems)).toBe(true)
  expect(result.activityBarItems.length).toBeGreaterThan(0)
})

test('loadContent preserves other state properties', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'test',
    uid: 123,
    width: 100,
  }

  const result: ActivityBarState = await loadContent(state)

  expect(result.uid).toBe(123)
  expect(result.width).toBe(100)
  expect(result.currentViewletId).toBe('Explorer')
  expect(result.selectedIndex).toBe(0)
})

test('loadContent adds activityBarItems to state', async () => {
  const state: ActivityBarState = createDefaultState()

  const result: ActivityBarState = await loadContent(state)

  expect(result.activityBarItems.length).toBe(6)
  expect(result.activityBarItems[0].id).toBeDefined()
  expect(result.activityBarItems[0].title).toBeDefined()
  expect(result.activityBarItems[0].icon).toBeDefined()
})

test('loadContent marks explorer item as selected', async () => {
  const state: ActivityBarState = createDefaultState()

  const result: ActivityBarState = await loadContent(state)

  const explorerItem = result.activityBarItems[0]
  expect(explorerItem.flags & ActivityBarItemFlags.Selected).toBeTruthy()
})

test('loadContent returns new state object', async () => {
  const state: ActivityBarState = createDefaultState()

  const result: ActivityBarState = await loadContent(state)

  expect(result).not.toBe(state)
})

test('loadContent marks only explorer item as selected', async () => {
  const state: ActivityBarState = createDefaultState()

  const result: ActivityBarState = await loadContent(state)

  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[2].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[3].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[4].flags & ActivityBarItemFlags.Selected).toBeFalsy()
  expect(result.activityBarItems[5].flags & ActivityBarItemFlags.Selected).toBeFalsy()
})

test('loadContent includes account button when accountEnabled is true', async () => {
  const state: ActivityBarState = { ...createDefaultState(), accountEnabled: true }

  const result: ActivityBarState = await loadContent(state)

  expect(result.activityBarItems.length).toBe(7)
  const accountItem = result.activityBarItems.find((item) => item.id === 'Account')
  expect(accountItem).toBeDefined()
  expect(accountItem?.icon).toBe('Account')
})

test('loadContent does not include account button when accountEnabled is false', async () => {
  const state: ActivityBarState = createDefaultState()

  const result: ActivityBarState = await loadContent(state)

  expect(result.activityBarItems.length).toBe(6)
  const accountItem = result.activityBarItems.find((item) => item.id === 'Account')
  expect(accountItem).toBeUndefined()
})
