import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntriesAccountLoggedIn, getMenuEntriesAccountLoggedOut } from '../src/parts/GetMenuEntriesAccount/GetMenuEntriesAccount.ts'

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

test('getMenuEntriesAccountLoggedIn returns sign out entry for logged in state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logged in',
  }

  const result = getMenuEntriesAccountLoggedIn(state)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: 0,
      id: 'signOut',
      label: 'Sign Out',
    },
  ])
})

test('getMenuEntriesAccountLoggedIn returns signing out entry for logging out state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logging out',
  }

  const result = getMenuEntriesAccountLoggedIn(state)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: 0,
      id: 'signOut',
      label: 'Signing Out...',
    },
  ])
})
