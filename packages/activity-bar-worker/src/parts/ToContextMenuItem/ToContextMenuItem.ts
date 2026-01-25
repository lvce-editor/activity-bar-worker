import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

export const toContextMenuItem = (activityBarItem: ActivityBarItem): MenuEntry => {
  const isEnabled = activityBarItem.flags & ActivityBarItemFlags.Enabled
  return {
    command: '',
    flags: isEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
    id: '', // TODO
    label: activityBarItem.id,
  }
}
