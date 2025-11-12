import { MenuEntryId } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'
import { getMenuEntriesActivityBar } from '../GetMenuEntriesActivityBar/GetMenuEntriesActivityBar.ts'
import { getMenuEntriesAdditionalViews } from '../GetMenuEntriesAdditionalViews/GetMenuEntriesAdditionalViews.ts'
import { getMenuEntriesSettings } from '../GetMenuEntriesSettings/GetMenuEntriesSettings.ts'

export const getMenuEntries = (id: number): readonly MenuEntry[] => {
  const tuple = ActivityBarStates.get(id)
  if (!tuple) {
    return []
  }
  const { newState } = tuple
  switch (id) {
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
