import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const loadContent = async (state: ActivityBarState, savedState: any): Promise<ActivityBarState> => {
  const { itemHeight, height } = state
  const items = getActivityBarItems()
  const explorerIndex = 0
  const itemsWithSelected = markSelected(items, explorerIndex)
  const filteredItems = getFilteredActivityBarItems(itemsWithSelected, height, itemHeight)
  return {
    ...state,
    activityBarItems: itemsWithSelected,
    currentViewletId: ViewletModuleId.Explorer,
    filteredItems,
    selectedIndex: explorerIndex,
    sideBarVisible: true,
  }
}
