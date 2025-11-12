import { MenuEntryId } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getMenuEntryIds = (): readonly number[] => {
  return [MenuEntryId.ActivityBar, MenuEntryId.ActivityBarAdditionalViews, MenuEntryId.Settings]
}

export const getMenuEntries = (): readonly MenuEntry[] => {
  // TODO
  return []
}
