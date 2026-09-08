import { test, expect } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffCss from '../src/parts/DiffCss/DiffCss.ts'

test('DiffCss.isEqual should return false for identical states', () => {
  const state = createDefaultState()
  const result = DiffCss.isEqual(state, state)
  expect(result).toBe(true)
})

test('DiffCss.isEqual should return false for different states', () => {
  const state1 = createDefaultState()
  const state2: ActivityBarState = {
    ...createDefaultState(),
    width: 100,
  }
  const result = DiffCss.isEqual(state1, state2)
  expect(result).toBe(true)
})

test('DiffCss.isEqual should return false when focus changes', () => {
  const state1 = createDefaultState()
  const state2: ActivityBarState = {
    ...createDefaultState(),
    focus: 1,
  }
  const result = DiffCss.isEqual(state1, state2)
  expect(result).toBe(true)
})

test('DiffCss.isEqual should return false when focused changes', () => {
  const state1 = createDefaultState()
  const state2: ActivityBarState = {
    ...createDefaultState(),
    focused: true,
  }
  const result = DiffCss.isEqual(state1, state2)
  expect(result).toBe(true)
})

test('DiffCss.isEqual should return false when activityBarItems changes', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'icon',
      id: 'test',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Test',
    },
  ]

  const state1 = createDefaultState()
  const state2: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
  }
  const result = DiffCss.isEqual(state1, state2)
  expect(result).toBe(true)
})

test('DiffCss.isEqual should return false when currentViewletId changes', () => {
  const state1 = createDefaultState()
  const state2: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'explorer',
  }
  const result = DiffCss.isEqual(state1, state2)
  expect(result).toBe(true)
})

test('DiffCss.isEqual should return false when custom icon is added', () => {
  const state1 = createDefaultState()
  const state2: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: 'MaskIconCustomViewabc',
        customIconUrl: 'https://example.com/icon.svg',
        enabled: false,
        flags: 0,
        hasPopup: false,
        icon: 'https://example.com/icon.svg',
        id: 'test',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Test',
      },
    ],
  }
  const result = DiffCss.isEqual(state1, state2)
  expect(result).toBe(false)
})

test('DiffCss.isEqual should return false when custom icon url changes', () => {
  const state1: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: 'MaskIconCustomViewabc',
        customIconUrl: 'https://example.com/icon.svg',
        enabled: false,
        flags: 0,
        hasPopup: false,
        icon: 'https://example.com/icon.svg',
        id: 'test',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Test',
      },
    ],
  }
  const state2: ActivityBarState = {
    ...state1,
    filteredItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: 'MaskIconCustomViewabc',
        customIconUrl: 'https://example.com/other.svg',
        enabled: false,
        flags: 0,
        hasPopup: false,
        icon: 'https://example.com/other.svg',
        id: 'test',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Test',
      },
    ],
  }
  const result = DiffCss.isEqual(state1, state2)
  expect(result).toBe(false)
})
