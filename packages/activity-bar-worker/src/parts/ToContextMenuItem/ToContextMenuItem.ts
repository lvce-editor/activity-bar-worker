import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

export const toContextMenuItem = (activityBarItem: ActivityBarItem): MenuEntry => {
  const isEnabled = activityBarItem.flags & ActivityBarItemFlags.Enabled
  return {
    args: [activityBarItem.id],
    command: 'ActivityBar.toggleActivityBarItem',
    flags: isEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
    id: `toggle-${activityBarItem.id}`,
    label: activityBarItem.id,
  }
}
