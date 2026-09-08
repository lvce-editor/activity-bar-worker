import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleBlur } from '../src/parts/HandleBlur/HandleBlur.ts'

test('handleBlur sets focused to false', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
  }

  const result: ActivityBarState = handleBlur(state)

  expect(result.focused).toBe(false)
  expect(result).not.toBe(state)
})

test('handleBlur preserves other state properties', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'icon2',
      id: 'item2',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 2',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    currentViewletId: 'test-viewlet',
    focused: true,
    focusedIndex: 2,
  }

  const { activityBarItems, currentViewletId, focusedIndex } = state
  const result: ActivityBarState = handleBlur(state)

  expect(result.focused).toBe(false)
  expect(result.focusedIndex).toBe(focusedIndex)
  expect(result.activityBarItems).toBe(activityBarItems)
  expect(result.currentViewletId).toBe(currentViewletId)
})

test('handleBlur works when focused is already false', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    focused: false,
  }

  const result: ActivityBarState = handleBlur(state)

  expect(result.focused).toBe(false)
  expect(result).not.toBe(state)
})

test('handleBlur returns new state object', () => {
  const state: ActivityBarState = createDefaultState()
  const result: ActivityBarState = handleBlur(state)

  expect(result).not.toBe(state)
})
