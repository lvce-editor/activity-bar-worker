import { expect, test } from '@jest/globals'
import { MenuEntryId, SideBarLocationType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import type { ContextMenuProps } from '../src/parts/ContextMenuProps/ContextMenuProps.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import { ACCOUNT_MENU_ID } from '../src/parts/HandleClickAccount/HandleClickAccount.ts'

test('getMenuEntries returns menu entries for ActivityBar menuId', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    sideBarLocation: SideBarLocationType.Left,
  }
  const options: ContextMenuProps = {
    menuId: MenuEntryId.ActivityBar,
  }

  const result = getMenuEntries(state, options)
  const lastEntry = result.at(-1)

  expect(result.length).toBeGreaterThan(0)
  expect(lastEntry).toBeDefined()
  expect(lastEntry?.command).toBe('Layout.hideActivityBar')
})

test('getMenuEntries returns menu entries for ActivityBarAdditionalViews menuId', () => {
  const state: ActivityBarState = createDefaultState()
  const options: ContextMenuProps = {
    menuId: MenuEntryId.ActivityBarAdditionalViews,
    viewletId: 'test-viewlet',
  }

  const result = getMenuEntries(state, options)

  expect(Array.isArray(result)).toBe(true)
})

test('getMenuEntries returns menu entries for Settings menuId', () => {
  const state: ActivityBarState = createDefaultState()
  const options: ContextMenuProps = {
    menuId: MenuEntryId.Settings,
  }

  const result = getMenuEntries(state, options)

  expect(result.length).toBeGreaterThan(0)
  expect(result[0].command).toBe('QuickPick.showEverything')
})

test('getMenuEntries returns menu entries for Account menuId', () => {
  const state: ActivityBarState = createDefaultState()
  const options: ContextMenuProps = {
    menuId: ACCOUNT_MENU_ID,
  }

  const result = getMenuEntries(state, options)

  expect(result.length).toBe(1)
  expect(result[0].command).toBe('ActivityBar.handleClickSignIn')
  expect(result[0].label).toBe('Sign In')
})

test('getMenuEntries returns account menu entries for logging in state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logging in',
  }
  const options: ContextMenuProps = {
    menuId: ACCOUNT_MENU_ID,
  }

  const result = getMenuEntries(state, options)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignIn',
      flags: 0,
      id: 'signIn',
      label: 'Signing In...',
    },
  ])
})

test('getMenuEntries returns account menu entries for logged in state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logged in',
  }
  const options: ContextMenuProps = {
    menuId: ACCOUNT_MENU_ID,
  }

  const result = getMenuEntries(state, options)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: 0,
      id: 'signOut',
      label: 'Sign Out',
    },
  ])
})

test('getMenuEntries returns account menu entries for logging out state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    userLoginState: 'logging out',
  }
  const options: ContextMenuProps = {
    menuId: ACCOUNT_MENU_ID,
  }

  const result = getMenuEntries(state, options)

  expect(result).toEqual([
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: 0,
      id: 'signOut',
      label: 'Signing Out...',
    },
  ])
})

test('getMenuEntries returns empty array for unknown menuId', () => {
  const state: ActivityBarState = createDefaultState()
  const options: ContextMenuProps = {
    menuId: 9999 as any,
  }

  const result = getMenuEntries(state, options)

  expect(result).toEqual([])
})
