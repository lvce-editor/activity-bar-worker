import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { getMenuEntriesActivityBar } from '../GetMenuEntriesActivityBar/GetMenuEntriesActivityBar.ts'
import { getMenuEntriesAdditionalViews } from '../GetMenuEntriesAdditionalViews/GetMenuEntriesAdditionalViews.ts'
import { getMenuEntriesSettings } from '../GetMenuEntriesSettings/GetMenuEntriesSettings.ts'

export const getMenuEntries = (state: ActivityBarState, options: ContextMenuProps): readonly MenuEntry[] => {
  const { menuId } = options
  switch (menuId) {
    case MenuEntryId.ActivityBar:
      return getMenuEntriesActivityBar(state)
    case MenuEntryId.ActivityBarAdditionalViews:
      return getMenuEntriesAdditionalViews(state)
    case MenuEntryId.Settings:
      return getMenuEntriesSettings()
    default:
      return []
  }
}
