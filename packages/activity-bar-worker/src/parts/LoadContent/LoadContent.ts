import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getActivityBarItems } from '../GetActivityBarItems/GetActivityBarItems.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const loadContent = async (state: ActivityBarState, savedState: any): Promise<ActivityBarState> => {
  const items = getActivityBarItems()
  const explorerIndex = 0
  const itemsWithSelected = items.map((item, index) => {
    const isSelected = index === explorerIndex
    return setFlag(item, ActivityBarItemFlags.Selected, isSelected)
  })
  return {
    ...state,
    activityBarItems: itemsWithSelected,
    sideBarVisible: true,
    currentViewletId: ViewletModuleId.Explorer,
    selectedIndex: explorerIndex,
  }
}
