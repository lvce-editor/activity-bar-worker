import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import { menuEntryMoveSideBar } from '../MenuEntryMoveSideBar/MenuEntryMoveSideBar.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'

const toContextMenuItem = (activityBarItem: ActivityBarItem): MenuEntry => {
  const isEnabled = activityBarItem.flags & ActivityBarItemFlags.Enabled
  return {
    label: activityBarItem.id,
    id: '', // TODO
    flags: isEnabled ? MenuItemFlags.Checked : MenuItemFlags.Unchecked,
    command: '',
  }
}

export const getMenuEntriesActivityBar = (state: ActivityBarState): readonly MenuEntry[] => {
  const { activityBarItems, sideBarLocation } = state
  return [
    ...activityBarItems.map(toContextMenuItem),
    MenuEntrySeparator.menuEntrySeparator,
    menuEntryMoveSideBar(sideBarLocation),
    {
      id: 'hideActivityBar',
      label: ViewletActivityBarStrings.hideActivityBar(),
      flags: MenuItemFlags.None,
      command: 'Layout.hideActivityBar',
    },
  ]
}
