import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { markSelected } from '../MarkSelected/MarkSelected.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const loadContent = async (state: ActivityBarState, savedState: any): Promise<ActivityBarState> => {
  const items = getActivityBarItems()
  const explorerIndex = 0
  const itemsWithSelected = markSelected(items, explorerIndex)
  return {
    ...state,
    activityBarItems: itemsWithSelected,
    sideBarVisible: true,
    currentViewletId: ViewletModuleId.Explorer,
    selectedIndex: explorerIndex,
  }
}
