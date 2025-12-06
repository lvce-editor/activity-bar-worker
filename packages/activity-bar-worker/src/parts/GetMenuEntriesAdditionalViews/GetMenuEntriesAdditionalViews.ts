import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { getHiddenItems } from '../ViewletActivityBar/ViewletActivityBarGetHiddenItems.ts'

const toContextMenuItem = (activityBarItem: ActivityBarItem): MenuEntry => {
  return {
    command: '-1', // TODO
    flags: MenuItemFlags.None,
    id: '8000', // TODO
    label: activityBarItem.id,
  }
}

export const getMenuEntriesAdditionalViews = (state: ActivityBarState): readonly MenuEntry[] => {
  const hiddenActivityBarItems = getHiddenItems(state)
  return hiddenActivityBarItems.map(toContextMenuItem)
}
