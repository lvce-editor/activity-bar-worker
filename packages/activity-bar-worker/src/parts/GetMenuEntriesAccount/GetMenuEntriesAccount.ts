import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getMenuEntriesAccount = (state: ActivityBarState): readonly MenuEntry[] => {
  const { userLoginState } = state
  const signInLabel = userLoginState === 'logging in' ? 'Signing In...' : 'Sign In'
  const signOutLabel = userLoginState === 'logging out' ? 'Signing Out...' : 'Sign Out'
  if (userLoginState === 'logged in' || userLoginState === 'logging out') {
    return [
      {
        command: 'ActivityBar.handleClickSignOut',
        flags: MenuItemFlags.None,
        id: 'signOut',
        label: signOutLabel,
      },
    ]
  }
  return [
    {
      command: 'ActivityBar.handleClickSignIn',
      flags: MenuItemFlags.None,
      id: 'signIn',
      label: signInLabel,
    },
  ]
}
