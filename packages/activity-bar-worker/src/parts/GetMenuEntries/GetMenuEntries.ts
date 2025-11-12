import { MenuEntryId } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'
import { getMenuEntriesActivityBar } from '../GetMenuEntriesActivityBar/GetMenuEntriesActivityBar.ts'

export const getMenuEntryIds = (): readonly number[] => {
  return [MenuEntryId.ActivityBar, MenuEntryId.ActivityBarAdditionalViews, MenuEntryId.Settings]
}

export const getMenuEntries = (id: number): readonly MenuEntry[] => {
  const tuple = ActivityBarStates.get(id)
  if (!tuple) {
    return []
  }
  const { newState } = tuple
  switch (id) {
    case MenuEntryId.ActivityBar:
      return getMenuEntriesActivityBar(newState)
    default:
      return []
  }
}
