import { expect, test } from '@jest/globals'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setAccountEnabled } from '../src/parts/SetAccountEnabled/SetAccountEnabled.ts'

test('setAccountEnabled enables account and rebuilds item lists', () => {
  const state = {
    ...createDefaultState(),
    activityBarItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: 0,
        hasPopup: false,
        icon: 'x',
        id: 'x',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'x',
      },
    ],
    filteredItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: 0,
        hasPopup: false,
        icon: 'y',
        id: 'y',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'y',
      },
    ],
    height: 1200,
    itemHeight: 48,
    selectedIndex: 0,
  }

  const result = setAccountEnabled(state, true)

  expect(result).not.toBe(state)
  expect(result.accountEnabled).toBe(true)
  expect(result.activityBarItems.length).toBe(8)
  expect(result.filteredItems.length).toBe(7)
  expect(result.activityBarItems.some((item) => item.id === 'Account')).toBe(true)
  expect(result.filteredItems.some((item) => item.id === 'Account')).toBe(true)
})

test('setAccountEnabled disables account and removes account item', () => {
  const stateWithAccount = setAccountEnabled(
    {
      ...createDefaultState(),
      height: 1200,
      itemHeight: 48,
      selectedIndex: 1,
    },
    true,
  )

  const result = setAccountEnabled(stateWithAccount, false)

  expect(result.accountEnabled).toBe(false)
  expect(result.activityBarItems.length).toBe(7)
  expect(result.filteredItems.length).toBe(6)
  expect(result.activityBarItems.some((item) => item.id === 'Account')).toBe(false)
  expect(result.filteredItems.some((item) => item.id === 'Account')).toBe(false)
})

test('setAccountEnabled preserves selected index marking', () => {
  const state = {
    ...createDefaultState(),
    height: 1200,
    itemHeight: 48,
    selectedIndex: 2,
  }

  const result = setAccountEnabled(state, true)

  expect(result.activityBarItems[2].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
})

test('setAccountEnabled recalculates filtered items for constrained height', () => {
  const state = {
    ...createDefaultState(),
    height: 192,
    itemHeight: 48,
    selectedIndex: 0,
  }

  const result = setAccountEnabled(state, true)

  expect(result.filteredItems.length).toBe(4)
  expect(result.filteredItems[2].id).toBe('Additional Views')
  expect(result.filteredItems[3].id).toBe('Settings')
})

test('setAccountEnabled preserves an activated References item', () => {
  const state = {
    ...createDefaultState(),
    accountEnabled: false,
    activityBarItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
        hasPopup: false,
        icon: 'References',
        id: 'References',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'References',
      },
    ],
    height: 1200,
  }

  const result = setAccountEnabled(state, true)

  const referencesItem = result.activityBarItems.find((item) => item.id === 'References')
  expect(referencesItem).toBeDefined()
  expect(referencesItem!.flags & ActivityBarItemFlags.Enabled).toBe(ActivityBarItemFlags.Enabled)
  expect(result.filteredItems.some((item) => item.id === 'References')).toBe(true)
})
