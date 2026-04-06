import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getMenuEntriesAccount = (state: ActivityBarState): readonly MenuEntry[] => {
  const signInLabel = state.userLoginState === 'logging in' ? 'Signing In...' : 'Sign In'
  const signOutLabel = state.userLoginState === 'logging out' ? 'Signing Out...' : 'Sign Out'
  return [
    {
      command: 'ActivityBar.handleClickSignIn',
      flags: MenuItemFlags.None,
      id: 'signIn',
      label: signInLabel,
    },
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: MenuItemFlags.None,
      id: 'signOut',
      label: signOutLabel,
    },
  ]
}
