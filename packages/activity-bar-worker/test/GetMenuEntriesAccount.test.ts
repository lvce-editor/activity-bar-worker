import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import {
  ACCOUNT_SUBMENU_ID,
  getMenuEntriesAccountLoggedIn,
  getMenuEntriesAccountLoggedOut,
  getMenuEntriesAccountSubMenu,
} from '../src/parts/GetMenuEntriesAccount/GetMenuEntriesAccount.ts'

test('getMenuEntriesAccountLoggedOut returns sign in entry for logged out state', () => {
  const state: ActivityBarState = createDefaultState()

  const result = getMenuEntriesAccountLoggedOut(state)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignIn',
      flags: 0,
      id: 'signIn',
      label: 'Sign In',
    },
  ])
})

test('getMenuEntriesAccountLoggedOut returns signing in entry for logging in state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logging in',
  }

  const result = getMenuEntriesAccountLoggedOut(state)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignIn',
      flags: 0,
      id: 'signIn',
      label: 'Signing In...',
    },
  ])
})

test('getMenuEntriesAccountLoggedIn returns account submenu entry for logged in state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logged in',
    userName: 'SimonSiefke',
  }

  const result = getMenuEntriesAccountLoggedIn(state)

  expect(result).toEqual([
    {
      args: [
        {
          menuId: ACCOUNT_SUBMENU_ID,
        },
      ],
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: ACCOUNT_SUBMENU_ID,
      label: 'SimonSiefke (GitHub)',
    },
  ])
})

test('getMenuEntriesAccountLoggedIn uses fallback account metadata', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginProvider: '',
    userLoginState: 'logged in',
    userName: '',
  }

  const result = getMenuEntriesAccountLoggedIn(state)

  expect(result[0].label).toBe('Account (GitHub)')
})

test('getMenuEntriesAccountSubMenu returns sign out entry for logged in state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logged in',
  }

  const result = getMenuEntriesAccountSubMenu(state)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: 0,
      id: 'signOut',
      label: 'Sign Out',
    },
  ])
})

test('getMenuEntriesAccountSubMenu returns signing out entry for logging out state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logging out',
  }

  const result = getMenuEntriesAccountSubMenu(state)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: 0,
      id: 'signOut',
      label: 'Signing Out...',
    },
  ])
})
