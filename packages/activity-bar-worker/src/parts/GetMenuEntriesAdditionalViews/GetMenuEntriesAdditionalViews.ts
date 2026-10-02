import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { ACCOUNT_MENU_ID } from '../HandleClickAccount/HandleClickAccount.ts'
import { getHiddenItems } from '../ViewletActivityBar/ViewletActivityBarGetHiddenItems.ts'

const toContextMenuItem = (activityBarItem: ActivityBarItem): MenuEntry => {
  if (activityBarItem.id === 'Account') {
    return {
      args: [
        {
          menuId: ACCOUNT_MENU_ID,
        },
      ],
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: ACCOUNT_MENU_ID,
      label: activityBarItem.title,
    }
  }
  return {
    args: [activityBarItem.id],
    command: 'ActivityBar.handleClickOther',
    flags: MenuItemFlags.None,
    id: `open-${activityBarItem.id}`,
    label: activityBarItem.title,
  }
}

export const getMenuEntriesAdditionalViews = (
  state: ActivityBarState,
  options?: { readonly action?: string; readonly viewletId?: string; readonly menuId?: number },
): readonly MenuEntry[] => {
  if (options && 'action' in options && options.action === 'moveTo' && 'viewletId' in options && options.viewletId) {
    return [
      {
        args: [options.viewletId],
        command: 'Layout.moveViewletToSecondarySideBar',
        flags: MenuItemFlags.None,
        id: 'moveToSecondarySideBar',
        label: 'Secondary Side Bar',
      },
    ]
  }
  const hiddenActivityBarItems = getHiddenItems(state)
  return hiddenActivityBarItems.map(toContextMenuItem)
}
