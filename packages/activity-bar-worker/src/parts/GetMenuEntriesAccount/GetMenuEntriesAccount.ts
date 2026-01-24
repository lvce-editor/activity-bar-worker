import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getMenuEntriesAccount = (state: ActivityBarState): readonly MenuEntry[] => {
  return [
    {
      command: 'Account.signIn',
      flags: MenuItemFlags.None,
      id: 'signIn',
      label: 'Sign In',
    },
    {
      command: 'Account.signOut',
      flags: MenuItemFlags.None,
      id: 'signOut',
      label: 'Sign Out',
    },
  ]
}
