import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { findIndex } from '../FindIndex/FindIndex.ts'
import { getActiveViewIds } from '../GetActiveViewIds/GetActiveViewIds.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'
import { markActiveViews } from '../MarkActiveViews/MarkActiveViews.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

const clearFocus = (item: ActivityBarItem): ActivityBarItem => {
  return setFlag(item, ActivityBarItemFlags.Focused, false)
}

const enableReferencesItem = (items: readonly ActivityBarItem[], id: string): readonly ActivityBarItem[] => {
  if (id !== ViewletModuleId.References) {
    return items
  }
  return items.map((item) => (item.id === id ? setFlag(item, ActivityBarItemFlags.Enabled, true) : item))
}

export const handleSideBarStateChange = async (state: ActivityBarState, id?: string, sideBarVisibleOverride?: boolean): Promise<ActivityBarState> => {
  const { activityBarItems, currentViewletId, focused, height, itemHeight } = state
  const activeViewIds = getActiveViewIds(activityBarItems)
  const resolvedId = id === undefined ? currentViewletId : id
  const sideBarVisible = typeof sideBarVisibleOverride === 'boolean' ? sideBarVisibleOverride : await getSideBarVisible()
  const withoutCurrentSideBarView = activeViewIds.filter((activeViewId) => activeViewId !== currentViewletId && activeViewId !== resolvedId)
  if (!sideBarVisible) {
    const itemsCleared = markActiveViews(activityBarItems.map(clearFocus), withoutCurrentSideBarView)
    const filteredItems = getFilteredActivityBarItems(itemsCleared, height, itemHeight)
    return {
      ...state,
      activityBarItems: itemsCleared,
      filteredItems,
      focusedIndex: -1,
      selectedIndex: -1,
      sideBarVisible: false,
    }
  }
  const enabledItems = enableReferencesItem(activityBarItems, resolvedId)
  const selectedIndex = findIndex(enabledItems, resolvedId)
  const newActiveViewIds = selectedIndex === -1 ? withoutCurrentSideBarView : [...withoutCurrentSideBarView, resolvedId]
  const newActivityBarItems = markActiveViews(enabledItems, newActiveViewIds)
  const filteredItems = getFilteredActivityBarItems(newActivityBarItems, height, itemHeight)
  return {
    ...state,
    activityBarItems: newActivityBarItems,
    currentViewletId: resolvedId,
    filteredItems,
    focused: resolvedId === currentViewletId && focused,
    selectedIndex,
    sideBarVisible,
  }
}
