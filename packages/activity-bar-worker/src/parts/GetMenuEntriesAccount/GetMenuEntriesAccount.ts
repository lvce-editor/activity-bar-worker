import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getMenuEntriesAccountLoggedIn = (state: ActivityBarState): readonly MenuEntry[] => {
  const { userLoginState } = state
  const signOutLabel = userLoginState === 'logging out' ? 'Signing Out...' : 'Sign Out'
  return [
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: MenuItemFlags.None,
      id: 'signOut',
      label: signOutLabel,
    },
  ]
}

export const getMenuEntriesAccountLoggedOut = (state: ActivityBarState): readonly MenuEntry[] => {
  const { userLoginState } = state
  const signInLabel = userLoginState === 'logging in' ? 'Signing In...' : 'Sign In'
  return [
    {
      command: 'ActivityBar.handleClickSignIn',
      flags: MenuItemFlags.None,
      id: 'signIn',
      label: signInLabel,
    },
  ]
}

export const getMenuEntriesAccount = (state: ActivityBarState): readonly MenuEntry[] => {
  // TODO maybe query it now from layout?
  const { userLoginState } = state
  if (userLoginState === 'logged in' || userLoginState === 'logging out') {
    return getMenuEntriesAccountLoggedIn(state)
  }
  return getMenuEntriesAccountLoggedOut(state)
}
