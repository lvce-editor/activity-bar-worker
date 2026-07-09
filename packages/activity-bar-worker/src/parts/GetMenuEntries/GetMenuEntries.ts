import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { ACCOUNT_SUBMENU_ID, getMenuEntriesAccount, getMenuEntriesAccountSubMenu } from '../GetMenuEntriesAccount/GetMenuEntriesAccount.ts'
import { getMenuEntriesActivityBar } from '../GetMenuEntriesActivityBar/GetMenuEntriesActivityBar.ts'
import { getMenuEntriesAdditionalViews } from '../GetMenuEntriesAdditionalViews/GetMenuEntriesAdditionalViews.ts'
import { getMenuEntriesSettings } from '../GetMenuEntriesSettings/GetMenuEntriesSettings.ts'
import { ACCOUNT_MENU_ID } from '../HandleClickAccount/HandleClickAccount.ts'

export const getMenuEntries = (state: ActivityBarState, options: ContextMenuProps): readonly MenuEntry[] => {
  const { menuId } = options
  switch (menuId) {
    case ACCOUNT_MENU_ID:
      return getMenuEntriesAccount(state)
    case ACCOUNT_SUBMENU_ID:
      return getMenuEntriesAccountSubMenu(state)
    case MenuEntryId.ActivityBar:
      return getMenuEntriesActivityBar(state)
    case MenuEntryId.ActivityBarAdditionalViews:
      return getMenuEntriesAdditionalViews(state)
    case MenuEntryId.Settings:
      return getMenuEntriesSettings(state)
    default:
      return []
  }
}
