import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState returns SavedState with uid and currentViewletId', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'explorer',
    uid: 123,
  }

  const result = saveState(state)

  expect(result).toEqual({ currentViewletId: 'explorer', uid: 123 })
})

test('saveState preserves uid and currentViewletId from state', () => {
  const items: readonly ActivityBarItem[] = [
    {
      flags: 0,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      title: 'Item 1',
    },
    {
      flags: 0,
      icon: 'icon2',
      id: 'item2',
      keyShortcuts: '',
      title: 'Item 2',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'search',
    focused: true,
    focusedIndex: 2,
    uid: 456,
  }

  const result = saveState(state)

  expect(result.uid).toBe(456)
  expect(result.currentViewletId).toBe('search')
  expect(result).toEqual({ currentViewletId: 'search', uid: 456 })
})

test('saveState handles uid of 0', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'debug',
    uid: 0,
  }

  const result = saveState(state)

  expect(result).toEqual({ currentViewletId: 'debug', uid: 0 })
})

test('saveState handles negative uid', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'scm',
    uid: -1,
  }

  const result = saveState(state)

  expect(result).toEqual({ currentViewletId: 'scm', uid: -1 })
})

test('saveState returns new object', () => {
  const state: ActivityBarState = createDefaultState()
  const result = saveState(state)

  expect(result).not.toBe(state)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})
