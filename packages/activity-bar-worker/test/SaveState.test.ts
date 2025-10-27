import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState returns SavedState with uid and currentViewletId', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: 123,
    currentViewletId: 'explorer',
  }

  const result = saveState(state)

  expect(result).toEqual({ uid: 123, currentViewletId: 'explorer' })
})

test('saveState preserves uid and currentViewletId from state', () => {
  const items: readonly ActivityBarItem[] = [
    {
      id: 'item1',
      title: 'Item 1',
      icon: 'icon1',
      flags: 0,
      keyShortcuts: '',
    },
    {
      id: 'item2',
      title: 'Item 2',
      icon: 'icon2',
      flags: 0,
      keyShortcuts: '',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: 456,
    currentViewletId: 'search',
    focusedIndex: 2,
    focused: true,
    activityBarItems: items,
  }

  const result = saveState(state)

  expect(result.uid).toBe(456)
  expect(result.currentViewletId).toBe('search')
  expect(result).toEqual({ uid: 456, currentViewletId: 'search' })
})

test('saveState handles uid of 0', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: 0,
    currentViewletId: 'debug',
  }

  const result = saveState(state)

  expect(result).toEqual({ uid: 0, currentViewletId: 'debug' })
})

test('saveState handles negative uid', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: -1,
    currentViewletId: 'scm',
  }

  const result = saveState(state)

  expect(result).toEqual({ uid: -1, currentViewletId: 'scm' })
})

test('saveState returns new object', () => {
  const state: ActivityBarState = createDefaultState()
  const result = saveState(state)

  expect(result).not.toBe(state)
  expect(result.currentViewletId).toBe(state.currentViewletId)
})
