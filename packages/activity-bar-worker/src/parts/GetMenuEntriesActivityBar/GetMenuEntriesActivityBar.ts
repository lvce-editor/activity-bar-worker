import { MenuEntryId, MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import { isMovableActivityBarItem } from '../IsMovableActivityBarItem/IsMovableActivityBarItem.ts'
import { menuEntryMoveSideBar } from '../MenuEntryMoveSideBar/MenuEntryMoveSideBar.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import { toContextMenuItem } from '../ToContextMenuItem/ToContextMenuItem.ts'

export const getMenuEntriesActivityBar = (state: ActivityBarState, targetViewletId = ''): readonly MenuEntry[] => {
  const { activityBarItems, sideBarLocation } = state
  const topItems = activityBarItems.filter((item) => !(item.flags & ActivityBarItemFlags.Button))
  const bottomItems = activityBarItems.filter((item) => item.flags & ActivityBarItemFlags.Button)
  const entries = topItems.map(toContextMenuItem)
  const targetItem = activityBarItems.find((item) => item.id === targetViewletId)

  if (bottomItems.length > 0) {
    entries.push(MenuEntrySeparator.menuEntrySeparator, ...bottomItems.map(toContextMenuItem))
  }

  return [
    ...entries,
    ...(isMovableActivityBarItem(targetItem)
      ? [
          {
            args: [{ action: 'moveTo', menuId: MenuEntryId.ActivityBarAdditionalViews, viewletId: targetViewletId }],
            command: '',
            flags: MenuItemFlags.SubMenu,
            id: MenuEntryId.ActivityBarAdditionalViews,
            label: 'Move To',
          },
        ]
      : []),
    MenuEntrySeparator.menuEntrySeparator,
    menuEntryMoveSideBar(sideBarLocation),
    {
      command: 'Layout.hideActivityBar',
      flags: MenuItemFlags.None,
      id: 'hideActivityBar',
      label: ViewletActivityBarStrings.hideActivityBar(),
    },
  ]
}
