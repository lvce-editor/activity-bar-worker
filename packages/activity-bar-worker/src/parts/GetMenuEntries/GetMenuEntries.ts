import { MenuEntryId } from '@lvce-editor/constants'
import type { ContextMenuOptions } from '../ContextMenuOptions/ContextMenuOptions.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'
import { getMenuEntriesActivityBar } from '../GetMenuEntriesActivityBar/GetMenuEntriesActivityBar.ts'
import { getMenuEntriesAdditionalViews } from '../GetMenuEntriesAdditionalViews/GetMenuEntriesAdditionalViews.ts'
import { getMenuEntriesSettings } from '../GetMenuEntriesSettings/GetMenuEntriesSettings.ts'

export const getMenuEntries = (id: number, options: ContextMenuOptions): readonly MenuEntry[] => {
  const tuple = ActivityBarStates.get(id)
  if (!tuple) {
    return []
  }
  const { newState } = tuple
  const { menuId } = options
  switch (menuId) {
    case MenuEntryId.ActivityBar:
      return getMenuEntriesActivityBar(newState)
    case MenuEntryId.ActivityBarAdditionalViews:
      return getMenuEntriesAdditionalViews(newState)
    case MenuEntryId.Settings:
      return getMenuEntriesSettings()
    default:
      return []
  }
}
